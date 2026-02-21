import { useState } from "react";
import axios from "axios";
import { Button } from "./Button";

export default function ClauseChat({ clauseText }: { clauseText: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "Is this clause standard?",
    "What are the risks here?",
    "How to negotiate this?",
    "Is this enforceable?"
  ];

  const askAI = async (query?: string) => {
    const finalQuestion = query || question;
    if (!finalQuestion.trim()) return;

    setLoading(true);
    setAnswer("");
    if (!query) setQuestion(finalQuestion);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/chat/clause",
        {
          clause_text: clauseText,
          question: finalQuestion,
        }
      );

      setAnswer(res.data.answer);
    } catch {
      setAnswer("Our AI advisors are currently unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 min-h-[210px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h4 className="font-bold text-slate-900">Clause Assistant</h4>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">Experimental</span>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && askAI()}
            placeholder="Ask a specific question about this clause..."
            className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all pr-24 shadow-sm"
          />
          <div className="absolute right-2 top-2">
            <Button 
              onClick={() => askAI()} 
              disabled={loading || !question.trim()}
              isLoading={loading}
              size="sm"
              className="h-10 px-6 rounded-lg"
            >
              Ask AI
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => askAI(q)}
              className="text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 px-3 py-1.5 rounded-lg transition-colors border border-slate-200"
            >
              {q}
            </button>
          ))}
        </div>

        {answer && (
          <div className="bg-slate-900 text-slate-200 p-6 rounded-xl border border-slate-800 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded bg-blue-500 flex items-center justify-center mt-1">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Response</p>
                <div className="text-[15px] leading-relaxed prose prose-invert max-w-none">
                  {answer}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
