import chromadb
from app.services.embedding_service import embed_text

client = chromadb.Client()
collection = client.get_or_create_collection(name="clauses")


# -------------------------
# Persistent Storage (Enterprise Mode)
# -------------------------

def store_clauses(clauses):
    for i, clause in enumerate(clauses):
        emb = embed_text(clause)
        collection.add(
            documents=[clause],
            embeddings=[emb],
            ids=[f"clause_{i}"]
        )


def retrieve_similar(query, k=3):
    q_emb = embed_text(query)

    res = collection.query(
        query_embeddings=[q_emb],
        n_results=k
    )

    return res["documents"][0]


# -------------------------
# Runtime Only RAG (Privacy Mode)
# -------------------------

def retrieve_similar_runtime(all_clauses, query, k=3):
    query_emb = embed_text(query)

    scored = []

    for clause in all_clauses:
        emb = embed_text(clause)
        score = cosine_similarity(query_emb, emb)
        scored.append((score, clause))

    scored.sort(reverse=True)
    return [c for _, c in scored[:k]]


def cosine_similarity(a, b):
    dot = sum(x*y for x, y in zip(a, b))
    mag_a = sum(x*x for x in a) ** 0.5
    mag_b = sum(x*x for x in b) ** 0.5
    return dot / (mag_a * mag_b + 1e-8)