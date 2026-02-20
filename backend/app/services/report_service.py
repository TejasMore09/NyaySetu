from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet
import os
from datetime import datetime
import json


def safe_text(value):
    """
    Converts anything into safe printable string for ReportLab
    """
    if value is None:
        return "N/A"
    if isinstance(value, dict):
        return json.dumps(value, indent=2)
    if isinstance(value, list):
        return ", ".join([safe_text(v) for v in value])
    return str(value)


def generate_risk_report(data: dict) -> str:
    os.makedirs("data/reports", exist_ok=True)

    filename = f"risk_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    filepath = os.path.join("data/reports", filename)

    doc = SimpleDocTemplate(filepath)
    styles = getSampleStyleSheet()
    elements = []

    # -------------------
    # Title
    # -------------------
    elements.append(Paragraph("AI Contract Risk Report", styles["Title"]))
    elements.append(Spacer(1, 12))

    # -------------------
    # Executive Summary
    # -------------------
    exec_summary = data.get("executive_summary", {})

    elements.append(Paragraph("Executive Summary", styles["Heading2"]))
    elements.append(
        Paragraph(
            safe_text(exec_summary.get("overall_summary")),
            styles["BodyText"]
        )
    )
    elements.append(
        Paragraph(
            f"Verdict: {safe_text(exec_summary.get('verdict','UNKNOWN'))}",
            styles["BodyText"]
        )
    )
    elements.append(Spacer(1, 12))

    # -------------------
    # Risk Overview
    # -------------------
    rs = data.get("risk_summary", {})

    elements.append(Paragraph("Risk Overview", styles["Heading2"]))
    elements.append(
        Paragraph(
            f"Overall Risk Score: {safe_text(rs.get('overall_score', 0))}",
            styles["BodyText"]
        )
    )
    elements.append(
        Paragraph(
            f"Status: {safe_text(rs.get('risk_level','UNKNOWN'))}",
            styles["BodyText"]
        )
    )
    elements.append(Spacer(1, 12))

    # -------------------
    # Top Risks
    # -------------------
    elements.append(Paragraph("Top Risks", styles["Heading2"]))

    top_risks = exec_summary.get("top_risks", [])

    if top_risks:
        elements.append(
            ListFlowable(
                [
                    ListItem(
                        Paragraph(safe_text(r), styles["BodyText"])
                    )
                    for r in top_risks
                ]
            )
        )
    else:
        elements.append(Paragraph("No major risks detected.", styles["BodyText"]))

    elements.append(Spacer(1, 12))

    # -------------------
    # Clause Breakdown
    # -------------------
    elements.append(Paragraph("Clause Analysis", styles["Heading2"]))

    for clause in data.get("clauses", []):

        elements.append(
            Paragraph(
                f"Clause {clause.get('id', 0) + 1}",
                styles["Heading4"]
            )
        )

        elements.append(
            Paragraph(
                safe_text(clause.get("text")),
                styles["BodyText"]
            )
        )

        ai = clause.get("ai_result", {})

        elements.append(
            Paragraph(
                f"Risk Level: {safe_text(ai.get('risk_level'))}",
                styles["BodyText"]
            )
        )

        elements.append(
            Paragraph(
                f"Explanation: {safe_text(ai.get('explanation'))}",
                styles["BodyText"]
            )
        )

        elements.append(
            Paragraph(
                f"Recommendation: {safe_text(ai.get('recommendation'))}",
                styles["BodyText"]
            )
        )

        elements.append(Spacer(1, 12))

    # Build PDF
    doc.build(elements)

    return filepath
