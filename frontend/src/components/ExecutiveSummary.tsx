import { Card, CardBody } from "./Card";
import { Badge } from "./Badge";
import { SectionHeader } from "./SectionHeader";

interface ExecutiveSummaryProps {
  data: any;
  onRiskClick?: (id: number) => void;
}

export default function ExecutiveSummary({ data, onRiskClick }: ExecutiveSummaryProps) {
  if (!data) return null;

  return (
    <div className="space-y-10">
      {/* EXECUTIVE INTELLIGENCE SUMMARY */}
      <section className="space-y-6">
        <SectionHeader 
          title="Executive Intelligence" 
          subtitle="AI-GENERATED SYNTHESIS OF LEGAL STANDING"
        />
        
        <Card className="bg-[#001b54] text-white border-none overflow-hidden relative shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" />
            </svg>
          </div>
          
          <CardBody className="p-10 md:p-14 relative z-10">
            <div className="flex flex-col md:flex-row gap-10 md:items-start">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <Badge variant="info" className="bg-white/10 text-white border-white/20 px-4 py-1.5 rounded-lg text-[10px] font-black tracking-[0.2em]">
                    AI INSIGHT
                  </Badge>
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Verified Logic</span>
                </div>
                
                <p className="text-xl md:text-2xl text-slate-100 leading-relaxed font-semibold">
                  {data.overall_summary || "No summary available."}
                </p>
                
                <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                  <div className="space-y-1">
                    <span className="text-white/40 block uppercase tracking-[0.2em] text-[9px] font-black">Contract Verdict</span>
                    <span className="text-white font-black text-xl tracking-tight">{data.verdict || "PENDING"}</span>
                  </div>
                </div>
              </div>
              
              <div className="shrink-0 md:w-px md:h-40 bg-white/10 hidden md:block" />
              
              <div className="md:w-64 space-y-4">
                <div className="p-6 bg-white/5 rounded-[24px] border border-white/10 backdrop-blur-sm">
                  <span className="text-white/40 block uppercase tracking-[0.2em] text-[9px] font-black mb-3">Priority Level</span>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
                    <span className="text-white font-black text-lg">CRITICAL REVIEW</span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* CRITICAL RISK GRID */}
      {data.top_risks && data.top_risks.length > 0 && (
        <section className="space-y-6">
          <SectionHeader 
            title="Critical Risk Factors" 
            subtitle="IDENTIFIED AREAS REQUIRING IMMEDIATE NEGOTIATION" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.top_risks.map((risk: any, i: number) => (
              <Card 
                key={i} 
                onClick={() => onRiskClick && onRiskClick(risk.clause_id || i)}
                className="group border-none shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 rounded-[32px] bg-white ring-1 ring-slate-100"
              >
                <CardBody className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <Badge variant="high" className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      INVESTIGATE
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <h4 className="font-black text-slate-900 text-lg leading-tight group-hover:text-[#537ff1] transition-colors">
                      {risk.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium italic opacity-80 line-clamp-3">
                      "{risk.impact}"
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Strategy</span>
                    <p className="text-sm font-bold text-slate-700 leading-snug">
                      {risk.action}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
