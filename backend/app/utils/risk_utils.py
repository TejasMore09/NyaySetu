from collections import Counter

RISK_WEIGHTS = {
    "LOW": 20,
    "MEDIUM": 50,
    "HIGH": 85,
    "UNKNOWN": 40
}

def compute_risk_metrics(clauses):
    """
    clauses: list of dicts with ai_result.risk_level
    """

    risk_levels = [
        c["ai_result"].get("risk_level", "UNKNOWN").upper()
        for c in clauses
    ]

    counts = Counter(risk_levels)

    total = len(risk_levels)
    if total == 0:
        return {}

    # Weighted score
    total_score = sum(
        RISK_WEIGHTS.get(level, 40) * count
        for level, count in counts.items()
    )

    overall_score = round(total_score / total, 2)

    dominant_risk = counts.most_common(1)[0][0]

    percentages = {
        level: round((count / total) * 100, 2)
        for level, count in counts.items()
    }

    return {
        "overall_risk_score": overall_score,
        "dominant_risk_level": dominant_risk,
        "distribution": counts,
        "percentages": percentages
    }
