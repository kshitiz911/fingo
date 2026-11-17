import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * KpiTile — stacked metric card.
 *
 *   [icon] Label
 *   ₹24,85,670            ← the number is the hero
 *   [delta pill]  sub      ← context, never competing with the value
 *
 * Stacking (instead of label-left / value-right) stops labels truncating
 * in 4-up rows and gives every tile the same reading order.
 * Click toggles the optional footer strip (footer + CTA).
 */
export default function KpiTile({
  label, sub, value, delta, deltaType = 'positive',
  icon,
  // Legacy props kept for backward compatibility (no longer used for colour)
  iconBg, iconColor, iconVariant, accent,
  footer, footerText,
  footerCta, footerBtn,
  footerCtaColor, footerBtnVariant,
}) {
  const [expanded, setExpanded] = useState(false);

  const footerLabel    = footer    || footerText || '';
  const footerBtnLabel = footerCta || footerBtn  || '';
  const hasFooter      = footerLabel || footerBtnLabel;

  const deltaStyles = {
    positive: 'bg-green-50 text-green-700',
    negative: 'bg-red-50 text-red-700',
    warning:  'bg-amber-50 text-amber-700',
    neutral:  'bg-slate-100 text-slate-600',
  };

  return (
    <div
      className={`bg-white rounded-card border border-[#E6EAF0] shadow-card overflow-hidden flex flex-col
                  ${hasFooter ? 'cursor-pointer hover:border-[#D5DCE5] transition-colors' : ''}`}
      onClick={() => hasFooter && setExpanded((e) => !e)}
    >
      <div className="flex flex-col gap-3 p-5">
        {/* Label row */}
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-navy flex items-center justify-center shrink-0
                            [&_svg]:w-[17px] [&_svg]:h-[17px]">
              {icon}
            </div>
          )}
          <p className="text-[13px] font-medium text-slate-600 leading-snug truncate flex-1" title={label}>
            {label}
          </p>
          {hasFooter && (
            <ChevronDown
              size={15}
              className={`text-subtle shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          )}
        </div>

        {/* Value */}
        <p className="text-[26px] font-bold text-navy leading-none tracking-[-0.01em] tabular-nums">
          {value}
        </p>

        {/* Context */}
        {(delta || sub) && (
          <div className="flex items-center gap-2 min-w-0">
            {delta && (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap shrink-0
                                ${deltaStyles[deltaType] || deltaStyles.neutral}`}>
                {delta}
              </span>
            )}
            {sub && <span className="text-[12px] text-muted truncate" title={sub}>{sub}</span>}
          </div>
        )}
      </div>

      {/* Expandable footer strip */}
      {hasFooter && (
        <div
          style={{
            maxHeight: expanded ? '60px' : '0px',
            opacity:   expanded ? 1 : 0,
            transition: 'max-height 0.25s ease, opacity 0.2s ease',
            overflow: 'hidden',
          }}
        >
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-[#EEF1F5] bg-[#F8FAFC]">
            {footerLabel && <p className="text-[12px] text-muted truncate flex-1">{footerLabel}</p>}
            {footerBtnLabel && (
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-lg shrink-0 bg-navy text-white
                           hover:bg-navy-light transition-colors"
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
