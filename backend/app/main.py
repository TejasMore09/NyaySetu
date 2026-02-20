from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.analyze import router as analyze_router
from app.api.chat import router as chat_router
from app.api.report import router as report_router

app = FastAPI(title="AI Contract Risk Scanner")

# -------------------
# CORS
# -------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------
# Routers
# -------------------
app.include_router(analyze_router, prefix="/api/analyze")
app.include_router(chat_router, prefix="/api")
app.include_router(report_router)

# -------------------
# Health Check
# -------------------
@app.get("/")
def root():
    return {"status": "Backend running"}
