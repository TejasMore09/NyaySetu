import { useState, useRef } from "react";
import UploadBox from "../components/UploadBox";
import { Card, CardBody } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import ExecutiveSummary from "../components/ExecutiveSummary";
import RiskCard from "../components/RiskCard";

export default function Analyze() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [privacyMode, setPrivacyMode] = useState(true);
  
  const clausesRef = useRef<Record<number, HTMLDivElement | null>>({});

  const scrollToClause = (id: number) => {
    const element = clausesRef.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-8', 'ring-[#537ff1]/20', 'ring-offset-0');
      setTimeout(() => {
        element.classList.remove('ring-8', 'ring-[#537ff1]/20', 'ring-offset-0');
      }, 2000);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/report/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result)
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `risk_report_${new Date().getTime()}.pdf`;
      a.click();
    } catch (err) {
      console.error("Failed to download report", err);
    }
  };

  const getRiskDistribution = () => {
    if (!result?.clauses) return { high: 15, medium: 35, low: 50 };
    const counts = result.clauses.reduce((acc: any, clause: any) => {
      const level = clause.ai_result?.risk_level?.toUpperCase();
      if (level === 'HIGH') acc.high++;
      else if (level === 'MEDIUM') acc.medium++;
      else acc.low++;
      return acc;
    }, { high: 0, medium: 0, low: 0 });
    
    const total = result.clauses.length || 1;
    return {
      high: (counts.high / total) * 100,
      medium: (counts.medium / total) * 100,
      low: (counts.low / total) * 100
    };
  };

  const dist = getRiskDistribution();

  return (
    <div className="flex min-h-screen bg-[#f8faff] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* SIDEBAR - HIGH CONTRAST PROFESSIONAL */}
      <aside className="hidden lg:flex w-80 bg-[#001b54] text-white flex-col sticky top-0 h-screen z-50 overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.05)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="p-10 relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">NyaySetu</span>
          </div>

          <nav className="space-y-4">
            {[
              { label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', active: true },
              { label: 'Intelligence', icon: 'M13 10V3L4 14h7v7l9-11h-7z', active: false },
              { label: 'Repository', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', active: false },
              { label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', active: false },
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${item.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                <svg className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${item.active ? 'text-white' : 'text-white/30 group-hover:text-white/70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <span className="text-sm font-black uppercase tracking-[0.15em]">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-10 relative z-10">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-[32px] p-8 border border-white/10 backdrop-blur-md space-y-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-[#001b54] font-black text-lg">PRO</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-black text-white uppercase tracking-widest">Enterprise API</p>
              <p className="text-xs text-white/40 leading-relaxed font-medium">Deploy custom LLM models for specialized legal branches.</p>
            </div>
            <Button variant="secondary" size="md" className="w-full bg-white text-[#001b54] hover:bg-slate-100 border-none font-black rounded-xl">UPGRADE NOW</Button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CANVAS */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* REFINED TOP BAR */}
        <header className="h-24 bg-white/60 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-40 px-12 flex items-center justify-between shrink-0">
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Session Analytics</p>
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Operational Command</h2>
          </div>

          <div className="space-y-1">
            <h2 className="text-[40px] font-black text-slate-900 tracking-tight uppercase">NyaySetu</h2>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 px-5 py-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em]">Private Network</span>
              <button 
                onClick={() => setPrivacyMode(!privacyMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none ${privacyMode ? 'bg-[#537ff1]' : 'bg-slate-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xl ring-0 transition duration-300 ease-in-out ${privacyMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            
            <div className="flex items-center gap-5">
              <button className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-[#537ff1] hover:border-[#537ff1]/30 transition-all group shadow-sm">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#537ff1] to-blue-700 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/30 ring-2 ring-white cursor-pointer hover:scale-105 transition-transform">
                TM
              </div>
            </div>
          </div>
        </header>

        <main className="p-12 space-y-16 max-w-[1600px] mx-auto w-full">
          
          {/* HIGH-IMPACT HERO BANNER */}
          <section>
            <div className="bg-[#537ff1] rounded-[48px] p-12 md:p-16 relative overflow-hidden shadow-2xl shadow-blue-500/30">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent skew-x-[-15deg] translate-x-1/4"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-center lg:text-left">
                  <Badge variant="info" className="bg-white/20 text-white border-white/10 px-5 py-2 text-[10px] font-white tracking-[0.3em]">VERSION 2.0 RELEASE</Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                    Legal Intelligence <br />
                    Redefined by AI.
                  </h1>
                  <p className="text-blue-50 text-xl leading-relaxed opacity-90 max-w-xl font-medium">
                    Analyze, negotiate, and secure contracts with enterprise-grade neural networks. Zero data retention, total compliance.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 bottom-2">
                    <Button variant="secondary" size="lg" className="bg-white text-[#537ff1] border-none font-black px-10 rounded-full hover:bg-slate-50 shadow-2xl shadow-black/10 transition-all hover:-translate-y-1">
                      ANALYZE NOW
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 justify-center lg:justify-start pt-6"><br></br></div>
                </div>
                
                <div className="hidden lg:flex justify-end">
                   <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 p-10 space-y-6 transform rotate-2 shadow-2xl shadow-black/20">
                      <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                      <div className="h-4 w-full bg-white/10 rounded-full" />
                      <div className="h-4 w-5/6 bg-white/10 rounded-full" />
                      <div className="pt-4 grid grid-cols-2 gap-4">
                        <div className="h-20 bg-white/10 rounded-[20px]" />
                        <div className="h-20 bg-white/10 rounded-[20px]" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            
            {/* CENTRAL WORKSPACE */}
            <div className="xl:col-span-8 space-y-16">
              
              {/* DOCUMENT INGESTION */}
              <section className="space-y-8">
                <SectionHeader title="Document Ingestion" subtitle="SUPPORTED FORMATS: PDF (OCR OPTIMIZED)" />
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[48px] bg-white ring-1 ring-slate-100 group">
                  <CardBody className="p-12">
                    <UploadBox 
                      onResult={(data) => {
                        setResult(data);
                        setTimeout(() => {
                          document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 500);
                      }} 
                      onLoading={setLoading} 
                      onError={setError}
                      loading={loading}
                    />
                    
                    {error && (
                      <div className="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-[32px] flex items-center gap-4 text-rose-700 text-sm justify-center font-bold animate-in zoom-in duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                      </div>
                    )}
                  </CardBody>
                </Card>
              </section>

              {/* INTELLIGENCE OUTPUTS */}
              {result && (
                <div id="analysis-results" className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-20">
                  
                  {/* DATA VISUALIZATION MODULES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Card className="border-none shadow-sm  bg-white ring-1 ring-slate-100 overflow-hidden group ">
                      <CardBody className="p-8 flex flex-col justify-between h-full space-y-8 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-50 transition-colors duration-500"></div>
                        
                        <div className="flex justify-between items-start relative z-10">
                          <SectionHeader title="Risk Profile" subtitle="QUANTITATIVE THREAT SCORE" className="mb-0" />
                          <Badge variant={
                            (result?.risk_summary?.dominant_risk_level === 'HIGH' ? 'high' : 
                             result?.risk_summary?.dominant_risk_level === 'MEDIUM' ? 'medium' : 'low') as any
                          } className="scale-110">
                            {result?.risk_summary?.dominant_risk_level ?? "UNKNOWN"}
                          </Badge>
                        </div>
                        
                        <div className="flex items-end gap-10 relative z-10">
                          <div className="text-8xl font-black text-slate-900 leading-none tracking-tighter">
                            {result?.risk_summary?.overall_risk_score ?? 0}
                          </div>
                          <div className="flex-1 space-y-4 pb-2">
                             <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                <div className={`h-full bg-gradient-to-r from-blue-400 to-[#537ff1] transition-all duration-1500`} style={{ width: `${result?.risk_summary?.overall_risk_score}%` }}></div>
                             </div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Accuracy Threshold: 99.4%</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card className="border-none shadow-sm rounded-[48px] bg-white ring-1 ring-slate-100 overflow-hidden group min-h-[180px]">
                      <CardBody className="p-12 space-y-8 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-50 transition-colors duration-500"></div>
                        
                        <SectionHeader title="Vector Analysis" subtitle="RISK DISTRIBUTION MAPPING" className="mb-0 relative z-10" />
                        <div className="space-y-6 relative z-10">
                          {[
                            { label: 'Critical Risk', color: 'bg-rose-500', value: dist.high },
                            { label: 'Market Deviation', color: 'bg-amber-400', value: dist.medium },
                            { label: 'Standard Compliance', color: 'bg-emerald-500', value: dist.low },
                          ].map((item, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <span>{item.label}</span>
                                <span className="text-slate-900">{Math.round(item.value)}%</span>
                              </div>
                              <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-100">
                                <div className={`h-full ${item.color} transition-all duration-1500 delay-${i * 150}`} style={{ width: `${item.value}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* SUMMARY SECTION */}
                  <ExecutiveSummary 
                    data={result?.executive_summary} 
                    onRiskClick={scrollToClause}
                  />

                  {/* DETAILED DRILLDOWN */}
                  <section className="space-y-10">
                    <SectionHeader title="Drilldown Analysis" subtitle="GRANULAR CLAUSE-BY-CLAUSE AUDIT" />
                    <div className="space-y-8">
                      {result.clauses?.map((clause: any, index: number) => (
                        <div key={index} ref={(el) => clausesRef.current[index] = el} className="transition-all duration-500">
                          <RiskCard clause={{...clause, id: index}} />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>

            {/* INTEL FEED SIDEBAR */}
            <aside className="xl:col-span-4 space-y-12">
              
              
              

              {result && (
                <div className="p-1 group">
                   <Button 
                    onClick={handleDownloadReport}
                    className="p-15px w-full bg-[#537ff1] text-white shadow-2xl shadow-blue-500/30 font-black py-10 rounded-[48px] text-lg hover:bg-blue-600 transition-all hover:-translate-y-2 active:translate-y-0 group-hover:scale-[1.02]"
                  >
                    GENERATE REPORT PDF
                  </Button>
                </div>
              )}
            </aside>
          </div>
        </main>

        <footer className="p-12 border-t border-slate-50 mt-12">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 opacity-30 grayscale">
              <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-black tracking-tighter uppercase text-sm">NyaySetu</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">NyaySetu Legal-Tech Dashboard • Enterprise Build 2.0.4 • © 2026</p>
            <div className="flex gap-8">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600 transition-colors">Compliance&nbsp;</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600 transition-colors">Privacy</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
