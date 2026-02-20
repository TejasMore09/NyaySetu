import re

def split_into_clauses(text: str):
    """
    Robust clause segmentation for messy PDFs
    """

    # Normalize spacing
    text = re.sub(r'\n+', '\n', text)

    # Try splitting by headings or numbered sections
    clauses = re.split(
        r'\n(?=[A-Z][A-Za-z\s]{3,50}:)|\n\d+\.\s|\n[A-Z][A-Z\s]{4,}\n',
        text
    )

    # Fallback: split by long sentences
    final_clauses = []
    for c in clauses:
        if len(c) > 800:
            sub = re.split(r'(?<=\.)\s+', c)
            final_clauses.extend(sub)
        else:
            final_clauses.append(c)

    cleaned = [c.strip() for c in final_clauses if len(c.strip()) > 80]
    return cleaned
