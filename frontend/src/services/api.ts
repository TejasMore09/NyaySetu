const API_BASE = "http://127.0.0.1:8000";

export async function analyzeContract(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/analyze/`, {
    method: "POST",
    body: formData
  });

  return res.json();
}
