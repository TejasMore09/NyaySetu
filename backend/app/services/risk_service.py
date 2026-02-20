from app.services.rag_service import retrieve_similar

RISK_MAP = {
    "LOW": 0.2,
    "MEDIUM": 0.6,
    "HIGH": 0.9
}

def classify_clause_risk(clause: str):
    references = retrieve_similar(clause)

    risk_level = "LOW"
    category = "General"

    text = clause.lower()

    if "terminate" in text or "termination" in text:
        risk_level = "MEDIUM"
        category = "Termination"

    if "liability" in text or "indemn" in text:
        risk_level = "HIGH"
        category = "Liability"

    if "arbitration" in text or "waive" in text:
        risk_level = "HIGH"
        category = "Legal Rights Restriction"

    return {
        "risk_level": risk_level,
        "risk_score": RISK_MAP[risk_level],
        "category": category,
        "references": references
    }
