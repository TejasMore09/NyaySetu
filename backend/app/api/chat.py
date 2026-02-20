from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.rag_service import retrieve_similar
from app.services.llm_service import call_openai

router = APIRouter(prefix="/chat", tags=["Clause Chat"])


class ClauseChatRequest(BaseModel):
    clause_text: str
    question: str


@router.post("/clause")
async def chat_about_clause(req: ClauseChatRequest):
    try:
        context = retrieve_similar(req.clause_text)

        prompt = f"""
You are a legal risk analysis AI.

Clause:
{req.clause_text}

User Question:
{req.question}

Respond clearly, practically, and concisely.
"""

        response = call_openai(
            system_prompt="You are a legal risk analysis AI.",
            user_prompt=prompt
        )

        return {
            "answer": response.get("explanation") or response.get("answer", "")
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Clause chat failed: {str(e)}"
        )
