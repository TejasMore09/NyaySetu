export default function ExecutiveSummary({ data }: any) {

  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">

      <h3 className="text-lg font-semibold mb-3">
        Executive Summary
      </h3>

      <p className="mb-3">
        {data.overall_summary}
      </p>

      <p className="font-medium mb-3">
        Verdict: {data.verdict}
      </p>

      <h4 className="font-semibold mb-2">Top Risks</h4>

      <ul className="space-y-2">
        {data.top_risks?.map((risk: any, i: number) => (
          <li key={i} className="border rounded p-3">

            <p className="font-semibold">
              {risk.title}
            </p>

            <p className="text-sm text-gray-600">
              Impact: {risk.impact}
            </p>

            <p className="text-sm text-gray-600">
              Action: {risk.action}
            </p>

          </li>
        ))}
      </ul>

    </div>
  );
}
