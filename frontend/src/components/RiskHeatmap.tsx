const COLORS: any = {
  LOW: "bg-green-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-red-500",
};

export default function RiskHeatmap({ percentages }: any) {

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <h3 className="font-semibold mb-4">
        Risk Distribution
      </h3>

      {["LOW","MEDIUM","HIGH"].map(level => (
        <div key={level} className="mb-3">

          <div className="flex justify-between text-sm mb-1">
            <span>{level}</span>
            <span>{percentages?.[level] || 0}%</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className={`${COLORS[level]} h-2 rounded`}
              style={{ width: `${percentages?.[level] || 0}%` }}
            />
          </div>

        </div>
      ))}

    </div>
  );
}
