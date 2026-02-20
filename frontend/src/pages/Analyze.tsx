import { useState } from "react";
import UploadBox from "../components/UploadBox";
import RiskCard from "../components/RiskCard";
import RiskSummary from "../components/RiskSummary";
import ExecutiveSummary from "../components/ExecutiveSummary";

export default function Analyze() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* LEFT PANEL */}
      <div className="w-[280px] bg-slate-900 text-white p-6">
        <h2 className="text-lg font-semibold mb-6">Contract Analytics</h2>

        {result ? (
          <RiskSummary
            clausesCount={result?.clauses_detected || 0}
            summary={result?.risk_summary}
          />
        ) : (
          <p className="text-gray-400 text-sm">
            Upload a contract to begin analysis
          </p>
        )}
      </div>

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            AI Contract Risk Scanner
          </h1>
        </header>

        {/* UPLOAD */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Upload Contract
          </h2>

          <UploadBox
            onResult={setResult}
            onLoading={setLoading}
            onError={setError}
          />

          {loading && (
            <p className="mt-4 text-blue-600">
              Analyzing contract…
            </p>
          )}

          {error && (
            <p className="mt-4 text-red-600">
              {error}
            </p>
          )}
        </section>

        {/* RESULTS */}
        {result?.clauses && (
          <>
            {/* OVERALL */}
            <section className="bg-white p-6 rounded-lg shadow mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  Overall Assessment
                </h2>
                <p className="text-gray-600">
                  Overall risk score
                </p>
              </div>

              <div className="text-right">
                <p className="text-4xl font-bold">
                  {result?.risk_summary?.overall_risk_score ?? 0}
                </p>
                <p className="text-sm text-gray-500">
                  {result?.risk_summary?.dominant_risk_level ?? "UNKNOWN"}
                </p>
              </div>
            </section>

            {/* EXECUTIVE SUMMARY */}
            <ExecutiveSummary data={result?.executive_summary} />

            {/* PDF DOWNLOAD */}
            <button
              onClick={async () => {
                const res = await fetch("http://127.0.0.1:8000/api/report/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(result)
                });

                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "contract_risk_report.pdf";
                a.click();
              }}
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Download Risk Report (PDF)
            </button>

            {/* CLAUSES */}
            <section className="mt-8">
              <h2 className="text-lg font-semibold mb-4">
                Clause Analysis
              </h2>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {result.clauses.map((clause: any, index: number) => (
                  <RiskCard key={index} clause={clause} />
                ))}
              </div>
            </section>
          </>
        )}

      </main>
    </div>
  );
}
