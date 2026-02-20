interface RiskSummaryProps {
  clausesCount: number;
  summary?: {
    overall_risk_score?: number;
    dominant_risk_level?: string;
    percentages?: Record<string, number>;
  };
}

const COLORS: Record<string, string> = {
  LOW: "bg-green-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-red-500",
  UNKNOWN: "bg-gray-400",
};

export default function RiskSummary({
  clausesCount,
  summary,
}: RiskSummaryProps) {
  const percentages = summary?.percentages || {};

  const getPercent = (level: string) =>
    percentages[level] !== undefined ? percentages[level] : 0;

  return (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-gray-400">Total Clauses</p>
        <p className="text-2xl font-bold">{clausesCount}</p>
      </div>

      <div>
        <p className="text-gray-400">Overall Risk Score</p>
        <p className="text-xl font-semibold">
          {summary?.overall_risk_score ?? "—"}
        </p>
      </div>

      <div>
        <p className="text-gray-400 mb-2">Risk Heatmap</p>

        {["LOW", "MEDIUM", "HIGH"].map((level) => (
          <div key={level} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>{level}</span>
              <span>{getPercent(level)}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded h-2 overflow-hidden">
              <div
                className={`${COLORS[level]} h-2`}
                style={{ width: `${getPercent(level)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-gray-400">Status</p>
        <p className="font-medium">
          {summary?.dominant_risk_level || "UNKNOWN"}
        </p>
      </div>
    </div>
  );
}
