import React from 'react';

/**
 * QuickAction — one shared shortcut card (Payments, Digital Assets).
 * Icon tile + label + one-line hint, left aligned.
 */
export default function QuickAction({ icon: Icon, label, sub, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex items-center gap-3 px-4 py-4 text-left bg-white rounded-card border border-[#E6EAF0]
                 shadow-card hover:border-primary/40 hover:shadow-card-hover transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0
                      group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-navy leading-snug">{label}</p>
        <p className="text-[12px] text-muted leading-snug truncate">{sub}</p>
      </div>
    </button>
  );
}
