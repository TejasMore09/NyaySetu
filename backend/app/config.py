import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:tejasmore.0911@localhost:5432/contract_ai"
)