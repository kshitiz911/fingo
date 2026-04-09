import React, { useState } from 'react';

/**
 * KpiTile — icon always #0d2b45 on #EFF6FF bg (professional single-color system)
 * Click anywhere on card body to expand footer strip.
 */
export default function KpiTile({
  label, sub, value, delta, deltaType = 'positive',
  icon,
  // Legacy props (kept for backward compat, ignored — icon is always navy on light-blue)
  iconBg, iconColor, iconVariant,
  footer, footerText,         // accept both prop names
  footerCta, footerBtn,       // accept both prop names
  footerCtaColor, footerBtnVariant, // accept both prop names
}) {
  const [expanded, setExpanded] = useState(false);

  // Normalise prop aliases
  const footerLabel = footer  || footerText  || '';
  const footerBtnLabel = footerCta || footerBtn || '';

  const deltaColors = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    warning:  'text-amber-500',
    neutral:  'text-slate-400',
  };

  // Single CTA color — navy filled
  const ctaStyle = 'bg-[#0d2b45] text-white hover:opacity-90';

  const hasFooter = footerLabel || footerBtnLabel;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer select-none"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
      onClick={() => hasFooter && setExpanded((e) => !e)}
    >
      {/* ── Main body ── */}
      <div className="flex items-center gap-3 px-4 py-4">
        {/* Icon — always navy on light-blue, no exceptions */}
        {icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#EFF6FF' }}
          >
            <span style={{ color: '#0d2b45' }}>{icon}</span>
          </div>
        )}

        {/* Label + sub */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-navy leading-tight truncate">{label}</p>
          {sub && <p className="text-[12px] text-muted mt-0.5 truncate">{sub}</p>}
        </div>

        {/* Value + delta */}
        <div className="text-right shrink-0">
          <p className="text-[20px] font-bold text-navy leading-tight">{value}</p>
          {delta && (
            <p className={`text-[11px] font-semibold mt-0.5 ${deltaColors[deltaType]}`}>
              {delta}
            </p>
          )}
        </div>
      </div>

      {/* ── Expandable footer strip ── */}
      {hasFooter && (
        <div
          style={{
            maxHeight: expanded ? '56px' : '0px',
            opacity:   expanded ? 1 : 0,
            transition: 'max-height 0.25s ease, opacity 0.2s ease',
            overflow: 'hidden',
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100"
            style={{ background: '#F8FAFC' }}
          >
            {footerLabel && (
              <p className="text-[12px] text-muted truncate flex-1 pr-3">{footerLabel}</p>
            )}
            {footerBtnLabel && (
              <button
                onClick={(e) => e.stopPropagation()}
                className={`text-[12px] font-semibold px-4 py-1.5 rounded-xl shrink-0
                            transition-all duration-150 active:scale-95 ${ctaStyle}`}
              >
                {footerBtnLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
