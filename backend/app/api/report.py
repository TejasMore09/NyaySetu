from fastapi import APIRouter
from fastapi.responses import FileResponse
from app.services.report_service import generate_risk_report

router = APIRouter(prefix="/api/report", tags=["report"])


@router.post("/")
def create_report(data: dict):
    filepath = generate_risk_report(data)

    return FileResponse(
        path=filepath,
        filename="contract_risk_report.pdf",
        media_type="application/pdf"
    )
