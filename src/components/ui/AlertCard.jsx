import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const config = {
  error:   { bg: 'bg-red-50 border-red-100',   icon: AlertTriangle, iconColor: 'text-red-500',   textColor: 'text-red-700' },
  success: { bg: 'bg-green-50 border-green-100',  icon: CheckCircle,   iconColor: 'text-green-600', textColor: 'text-green-700' },
  warning: { bg: 'bg-amber-50 border-amber-100',  icon: Clock,         iconColor: 'text-amber-500', textColor: 'text-amber-700' },
};

export default function AlertCard({ type = 'warning', title, sub }) {
  const { bg, icon: Icon, iconColor, textColor } = config[type] || config.warning;
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${bg}`}>
      <Icon size={16} className={`${iconColor} mt-0.5 shrink-0`} />
      <div className="min-w-0">
        <p className={`text-[13px] font-semibold leading-snug ${textColor}`}>{title}</p>
        {sub && <p className="text-[12px] text-slate-600 mt-0.5 leading-snug">{sub}</p>}
      </div>
    </div>
  );
}
