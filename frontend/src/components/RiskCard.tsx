import ClauseChat from "./ClauseChat";

export default function RiskCard({ clause }: any) {

  const levelColors: any = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
    UNKNOWN: "bg-gray-100 text-gray-800",
  };

  const deviationColors: any = {
    STANDARD: "bg-green-100 text-green-700",
    DEVIATES: "bg-yellow-100 text-yellow-700",
    HIGH_RISK: "bg-red-100 text-red-700",
    UNKNOWN: "bg-gray-100 text-gray-700"
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 border">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">
          Clause {clause.id + 1}
        </h3>

        <span
          className={`px-3 py-1 rounded text-sm font-semibold ${
            levelColors[clause.ai_result?.risk_level || "UNKNOWN"]
          }`}
        >
          {clause.ai_result?.risk_level || "UNKNOWN"}
        </span>
      </div>

      {/* Clause Text */}
      <p className="text-gray-700 text-sm whitespace-pre-wrap mb-4">
        {clause.text}
      </p>

      {/* AI Explanation */}
      <div className="mb-2">
        <strong>Explanation:</strong>{" "}
        {clause.ai_result?.explanation}
      </div>

      <div className="mb-2">
        <strong>Category:</strong>{" "}
        {clause.ai_result?.category}
      </div>

      <div className="mb-3">
        <strong>Recommendation:</strong>{" "}
        {clause.ai_result?.recommendation}
      </div>

      {/* Deviation */}
      {clause.deviation && (
        <div className="mb-3">
          <strong>Deviation:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-xs font-bold ml-2 ${
              deviationColors[clause.deviation.status || "UNKNOWN"]
            }`}
          >
            {clause.deviation.status}
          </span>

          <p className="text-sm text-gray-600 mt-1">
            {clause.deviation.reason}
          </p>
        </div>
      )}

      {/* Clause Chat */}
      <ClauseChat clauseText={clause.text} />

    </div>
  );
}
