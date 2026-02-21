NyaySetu — AI Contract Risk Intelligence Platform

AI-powered system that analyzes legal contracts, detects hidden risks, highlights deviations from standards, and generates executive-ready reports in seconds.

⸻

🚀 Problem Statement

Legal contracts are long, complex, and filled with hidden risks that most people cannot interpret.
Individuals, startups, and small businesses often sign agreements without understanding dangerous clauses, unfair obligations, or compliance issues.

Manual legal review is:
	•	Expensive
	•	Time-consuming
	•	Inaccessible to non-lawyers

Existing AI tools provide generic summaries but fail to give clause-level risk intelligence and actionable insights.

⸻

💡 Our Solution

NyaySetu is an AI-powered Contract Risk Intelligence system that:
	•	Breaks contracts into clauses
	•	Evaluates risk per clause using LLMs
	•	Uses Retrieval-Augmented Generation (RAG) for contextual understanding
	•	Detects deviations from industry standards
	•	Produces executive summaries & downloadable risk reports

The platform converts complex legal documents into plain-language risk intelligence.

⸻

🧠 Core Capabilities

✅ Clause-Level Risk Analysis
	•	LOW / MEDIUM / HIGH risk classification
	•	Explanation in plain English
	•	Category & recommendation

✅ RAG-Based Context Awareness
	•	Each clause is embedded
	•	Similar clauses retrieved for better reasoning

✅ Deviation & Red-Flag Engine
	•	Detects whether a clause:
	•	STANDARD
	•	DEVIATES
	•	HIGH_RISK

✅ Executive Risk Summary Generator
	•	Overall verdict
	•	Top risks
	•	Negotiation points
	•	Final advice

✅ Clause Chat (Ask AI about any clause)
	•	Ask questions about any clause in real-time

✅ PDF Risk Report Generator
	•	Executive summary
	•	Risk overview
	•	Clause-by-clause breakdown

✅ Privacy-First Architecture
	•	Files processed temporarily
	•	Auto-deleted after analysis
	•	No permanent storage of documents


Project Structure

Frontend (React + Vite + Tailwind)
        |
        | REST API
        |
Backend (FastAPI)
        |
        |-- PDF Text Extraction
        |-- Clause Segmentation
        |-- Embedding Generation
        |-- Vector DB (Chroma)
        |-- OpenAI GPT-4o-mini
        |
Output:
Clause Risks + Deviation + Executive Summary + PDF

🔁 System Workflow
	1.	User uploads PDF
	2.	Text extracted
	3.	Clauses split
	4.	Clauses embedded
	5.	Stored in Vector DB
	6.	Each clause sent to LLM with context
	7.	Risk + deviation computed
	8.	Executive summary generated
	9.	Results displayed
	10.	PDF report generated


Tech Stack

Frontend
	•	React + TypeScript
	•	Vite
	•	Tailwind CSS

Backend
	•	FastAPI (Python)
	•	OpenAI GPT-4o-mini
	•	Sentence-Transformers
	•	ChromaDB (Vector Database)

AI / NLP
	•	OpenAI Chat Completions API
	•	Embeddings for semantic search

PDF Processing
	•	PyMuPDF / pdfplumber
	•	ReportLab (PDF generation)

⸻

🔐 Why This Tech Stack?
	•	FastAPI → High-performance API backend
	•	OpenAI GPT-4o-mini → Fast, accurate reasoning at low cost
	•	ChromaDB → Lightweight vector search for RAG
	•	React + Tailwind → Rapid UI development
	•	Local embeddings → No dependency on external vector services

🛡️ Security & Privacy
	•	Files auto-deleted after processing
	•	No permanent storage of documents
	•	Optional RAG persistence mode
	•	Environment variables for API keys

⸻

🎯 Target Users
	•	Individuals
	•	Freelancers
	•	Startups
	•	SMEs
	•	Legal interns

⸻

🔮 Future Enhancements
	•	User accounts & authentication
	•	Contract template generator
	•	Clause benchmarking database
	•	Case workflow management
	•	Version history
	•	Audit logs
	•	Risk scoring calibration
	•	Multi-language support

⸻

👨‍💻 Team

Team Name: BeffJezos
Project: NyaySetu
Team Lead: Tejas More

⸻

📜 License

MIT License
