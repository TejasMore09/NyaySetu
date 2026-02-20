from app.services.llm_service import ask_llm_executive

def generate_executive_summary(enriched_clauses: list):

    compact = []

    for c in enriched_clauses:
        compact.append({
            "text": c["text"],
            "risk_level": c["ai_result"]["risk_level"],
            "category": c["ai_result"]["category"]
        })

    return ask_llm_executive(compact)