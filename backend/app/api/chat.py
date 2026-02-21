from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.rag_service import retrieve_similar
from app.services.llm_service import call_openai_text

router = APIRouter(prefix="/api/chat", tags=["Clause Chat"])


class ClauseChatRequest(BaseModel):
    clause_text: str
    question: str


@router.post("/clause")
async def chat_about_clause(req: ClauseChatRequest):
    try:
        context = retrieve_similar(req.clause_text)

        prompt = f"""
Clause:
{req.clause_text}

Relevant Context:
{context}

User Question:
{req.question}

Respond clearly and practically.
"""

        answer = call_openai_text(
            system_prompt="You are a legal contract assistant.",
            user_prompt=prompt
        )

        return {"answer": answer}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Clause chat failed: {str(e)}"
        )