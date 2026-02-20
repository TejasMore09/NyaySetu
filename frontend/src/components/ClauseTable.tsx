import RiskCard from "./RiskCard";

export default function ClauseTable({ clauses }: any) {

  return (
    <div className="space-y-4">
      {clauses.map((c: any) => (
        <RiskCard key={c.id} clause={c} />
      ))}
    </div>
  );
}
