import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = '', children }) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 ${className}`}>
      <div className="space-y-1">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>}
      </div>
      {children && <div className="flex shrink-0 gap-3">{children}</div>}
    </div>
  );
};
