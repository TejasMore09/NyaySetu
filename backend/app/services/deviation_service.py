from app.services.llm_service import ask_llm_deviation

def analyze_deviation(clause_text: str):
    return ask_llm_deviation(clause_text)