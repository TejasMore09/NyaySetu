import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
MODEL_NAME = "gpt-4o-mini"


# ==============================
# JSON MODE (Structured Output)
# ==============================

def call_openai_json(system_prompt: str, user_prompt: str):
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.2,
        response_format={"type": "json_object"}
    )

    return json.loads(response.choices[0].message.content)


# ==============================
# TEXT MODE (Chat Output)
# ==============================

def call_openai_text(system_prompt: str, user_prompt: str):
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content


# ==============================
# Clause Risk
# ==============================

def ask_llm_risk(clause_text: str, context: list):

    system_prompt = "You are a legal risk analysis AI. Return strict JSON only."

    user_prompt = f"""
Clause:
{clause_text}

Relevant Context:
{context}

Return JSON:
{{
  "explanation": "...",
  "risk_level": "LOW | MEDIUM | HIGH",
  "category": "...",
  "recommendation": "..."
}}
"""

    try:
        return call_openai_json(system_prompt, user_prompt)
    except Exception as e:
        return {
            "explanation": "LLM execution failed",
            "risk_level": "UNKNOWN",
            "category": "ERROR",
            "recommendation": str(e)
        }


# ==============================
# Clause Deviation
# ==============================

def ask_llm_deviation(clause_text: str):

    system_prompt = "You are a legal contract expert. Return strict JSON only."

    user_prompt = f"""
Determine if this clause deviates from industry standards.

Return JSON:
{{
  "status": "STANDARD | DEVIATES | HIGH_RISK",
  "reason": "short explanation"
}}

Clause:
{clause_text}
"""

    try:
        return call_openai_json(system_prompt, user_prompt)
    except Exception:
        return {
            "status": "UNKNOWN",
            "reason": "Deviation analysis failed"
        }


# ==============================
# Executive Summary
# ==============================

def ask_llm_executive(compact_data: list):

    system_prompt = "You are a senior legal advisor. Return strict JSON only."

    user_prompt = f"""
Based on this contract risk analysis, generate an executive summary.

Data:
{compact_data}

Return JSON:
{{
  "overall_verdict": "...",
  "top_risks": [
     {{"title":"...", "impact":"...", "action":"..."}}
  ],
  "negotiation_points": ["...", "..."],
  "final_advice": "..."
}}
"""

    try:
        return call_openai_json(system_prompt, user_prompt)
    except Exception:
        return {
            "overall_verdict": "Analysis Failed",
            "top_risks": [],
            "negotiation_points": [],
            "final_advice": "Manual review recommended"
        }