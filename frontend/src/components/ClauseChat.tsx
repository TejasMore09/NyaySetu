import { useState } from "react";
import axios from "axios";

export default function ClauseChat({ clauseText }: { clauseText: string }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/chat/clause",
        {
          clause_text: clauseText,
          question: question,
        }
      );

      setAnswer(res.data.answer);
    } catch {
      setAnswer("AI failed to answer.");
    }

    setLoading(false);
  };

  return (
    <div className="border-t pt-3">

      <button
        onClick={() => setOpen(!open)}
        className="text-blue-600 text-sm mb-2"
      >
        {open ? "Hide AI Chat" : "Ask AI about this clause"}
      </button>

      {open && (
        <div className="space-y-2">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about this clause..."
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <button
            onClick={askAI}
            className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
          >
            Ask
          </button>

          {loading && <p className="text-sm">Thinking...</p>}

          {answer && (
            <div className="bg-gray-100 p-3 rounded text-sm">
              {answer}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
