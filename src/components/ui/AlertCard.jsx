import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const config = {
  error:   { bg: 'bg-red-50   border-red-200',   icon: AlertTriangle, iconColor: 'text-red-500',   textColor: 'text-red-700' },
  success: { bg: 'bg-green-50 border-green-200',  icon: CheckCircle,   iconColor: 'text-green-600', textColor: 'text-green-700' },
  warning: { bg: 'bg-amber-50 border-amber-200',  icon: Clock,         iconColor: 'text-amber-500', textColor: 'text-amber-700' },
};

export default function AlertCard({ type = 'warning', title, sub }) {
  const { bg, icon: Icon, iconColor, textColor } = config[type] || config.warning;
  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${bg}`}>
      <Icon size={15} className={`${iconColor} mt-0.5 shrink-0`} />
      <div>
        <p className={`text-sm font-semibold ${textColor}`}>{title}</p>
        {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
