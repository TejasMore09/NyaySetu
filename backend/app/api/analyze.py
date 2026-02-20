from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

from app.services.pdf_service import extract_text_from_pdf
from app.services.clause_service import split_into_clauses
from app.services.rag_service import (
    store_clauses,
    retrieve_similar,
    retrieve_similar_runtime
)
from app.services.llm_service import ask_llm_risk
from app.services.deviation_service import analyze_deviation
from app.utils.risk_utils import compute_risk_metrics
from app.services.executive_service import generate_executive_summary

router = APIRouter()

UPLOAD_DIR = "data/uploads"

# -----------------------
# PRIVACY MODE FLAG
# -----------------------
PRIVACY_MODE = os.getenv("PRIVACY_MODE", "true").lower() == "true"


@router.post("/")
async def analyze_contract(file: UploadFile = File(...)):
    file_path = ""

    try:
        # ---------------------------
        # 1. Save file
        # ---------------------------
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # ---------------------------
        # 2. Extract text
        # ---------------------------
        text = extract_text_from_pdf(file_path)
        if not text.strip():
            raise ValueError("No text extracted from PDF")

        # ---------------------------
        # 3. Split clauses
        # ---------------------------
        clauses = split_into_clauses(text)
        if not clauses:
            raise ValueError("No clauses detected")

        # ---------------------------
        # 4. Store clauses ONLY if not privacy mode
        # ---------------------------
        if not PRIVACY_MODE:
            store_clauses(clauses)

        enriched_clauses = []

        # ---------------------------
        # 5. AI Processing
        # ---------------------------
        for idx, clause in enumerate(clauses):

            if PRIVACY_MODE:
                context = retrieve_similar_runtime(clauses, clause)
            else:
                context = retrieve_similar(clause)

            ai_result = ask_llm_risk(
                clause_text=clause,
                context=context
            )

            deviation = analyze_deviation(clause)

            enriched_clauses.append({
                "id": idx,
                "text": clause,
                "ai_result": ai_result,
                "deviation": deviation
            })

        # ---------------------------
        # 6. Risk summary
        # ---------------------------
        risk_summary = compute_risk_metrics(enriched_clauses)

        # ---------------------------
        # 7. Executive summary
        # ---------------------------
        executive_summary = generate_executive_summary(enriched_clauses)

        return {
            "clauses_detected": len(enriched_clauses),
            "clauses": enriched_clauses,
            "risk_summary": risk_summary,
            "executive_summary": executive_summary,
            "privacy_mode": PRIVACY_MODE
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Contract analysis failed: {str(e)}"
        )

    finally:
        # ---------------------------
        # 8. Auto delete uploaded file
        # ---------------------------
        if file_path and os.path.exists(file_path):
            os.remove(file_path)