import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'low' | 'medium' | 'high' | 'neutral' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    low: 'bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-100/50 font-black uppercase tracking-widest',
    medium: 'bg-amber-100 text-amber-700 border-amber-200 shadow-sm shadow-amber-100/50 font-black uppercase tracking-widest',
    high: 'bg-rose-100 text-rose-700 border-rose-200 shadow-sm shadow-rose-100/50 font-black uppercase tracking-widest',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 font-black uppercase tracking-widest',
    info: 'bg-blue-100 text-blue-700 border-blue-200 font-black uppercase tracking-widest',
  };

  return (
    <span className={`px-4 py-1.5 rounded-xl text-[10px] border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
