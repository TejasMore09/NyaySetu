import { useState } from "react";
import ClauseChat from "./ClauseChat";
import { Card, CardBody } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";

interface RiskCardProps {
  clause: any;
}

export default function RiskCard({ clause }: RiskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const riskLevel = clause.ai_result?.risk_level?.toUpperCase() || "UNKNOWN";
  
  const getVariant = (level: string) => {
    if (level === "LOW") return "low";
    if (level === "MEDIUM") return "medium";
    if (level === "HIGH") return "high";
    return "neutral";
  };

  const getColors = (level: string) => {
    if (level === "LOW") return { strip: 'bg-emerald-500', light: 'bg-emerald-50/50', border: 'border-emerald-100' };
    if (level === "MEDIUM") return { strip: 'bg-amber-400', light: 'bg-amber-50/50', border: 'border-amber-100' };
    if (level === "HIGH") return { strip: 'bg-rose-500', light: 'bg-rose-50/50', border: 'border-rose-100' };
    return { strip: 'bg-slate-300', light: 'bg-slate-50/50', border: 'border-slate-100' };
  };

  const colors = getColors(riskLevel);

  const copyFix = () => {
    if (clause.ai_result?.recommendation) {
      navigator.clipboard.writeText(clause.ai_result.recommendation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className={`transition-all duration-300 border-none ${expanded ? 'shadow-xl shadow-slate-200/50 border-blue-200' : 'shadow-sm hover:shadow-md'}`}>
      <div 
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer group"
      >
        <CardBody className="p-0">
          <div className="flex items-stretch min-h-24">
            {/* Risk Indicator Strip */}
            <div className={`w-2 shrink-0 ${colors.strip}`} />
            
            <div className="flex-1 p-6 flex items-center justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-lg">Clause {clause.id + 1}</span>
                  <Badge variant={getVariant(riskLevel)}>{riskLevel} RISK</Badge>
                  {clause.ai_result?.category && (
                    <span className="text-[10px] font-black text-slate-600 px-2.5 py-1 bg-slate-100 rounded-lg uppercase tracking-widest">
                      {clause.ai_result.category}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {clause.text.substring(0, 120)}...
                </h3>
              </div>
              
              <div className="flex items-center gap-4 shrink-0">
                <div className={`w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center transition-all group-hover:bg-slate-50 group-hover:border-[#537ff1] ${expanded ? 'rotate-180 bg-[#f1f4ff] border-[#537ff1]' : ''}`}>
                  <svg className="w-5 h-5 text-slate-500 group-hover:text-[#537ff1] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 animate-in slide-in-from-top-2 duration-300 bg-gradient-to-b from-white to-slate-50/20">
          <CardBody className="p-8 space-y-8">
            {/* Full Clause Text */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Original Clause Text</h4>
              <div className={`p-6 ${colors.light} rounded-2xl border ${colors.border} text-sm text-slate-700 leading-relaxed font-medium italic backdrop-blur-sm`}>
                "{clause.text}"
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Risk Reason */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#537ff1] to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-black text-slate-900 text-lg">Risk Analysis</h4>
                </div>
                <p className="text-slate-600 text-[15px] leading-relaxed font-medium">
                  {clause.ai_result?.explanation || "No detailed explanation provided."}
                </p>
                
                {clause.deviation && (
                  <div className="mt-6 p-5 rounded-2xl bg-amber-50 border-2 border-amber-100 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="medium">Market Deviation</Badge>
                      <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider">{clause.deviation.status}</span>
                    </div>
                    <p className="text-sm text-amber-800 font-bold">
                      {clause.deviation.reason}
                    </p>
                  </div>
                )}
              </div>

              {/* Suggested Fix */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-black text-slate-900 text-lg">Suggested Fix</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyFix}
                    className="h-10 gap-2 text-[10px] font-black uppercase tracking-wider hover:bg-slate-100"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 012 2h2a2 2 0 012-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="p-6 bg-emerald-50/80 rounded-2xl border-2 border-emerald-100 text-slate-800 text-[15px] leading-relaxed font-bold space-y-2">
                  {clause.ai_result?.recommendation || "No recommendation available."}
                </div>
              </div>
            </div>

            {/* AI Q&A Section */}
            <div className="pt-8 border-t border-slate-100">
              <ClauseChat clauseText={clause.text} />
            </div>
          </CardBody>
        </div>
      )}
    </Card>
  );
}
