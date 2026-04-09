// src/components/ui/KpiTile.jsx
// Matches the Fingo design: icon | label+sub | value+delta  +  optional footer strip

/**
 * Props:
 *  icon        — React node (Lucide icon, e.g. <Wallet size={18} />)
 *  iconVariant — 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'amber' | 'rose'
 *  label       — main title  e.g. "Shared Wallet"
 *  sub         — subtitle    e.g. "4 active members"
 *  value       — e.g. "₹ 15,950"
 *  delta       — e.g. "+2.5% this week"
 *  deltaType   — 'positive' | 'negative' | 'warning' | 'neutral'
 *  footerText  — e.g. "Last: Coffee Shop · ₹454"   (omit to hide footer)
 *  footerBtn   — label string e.g. "Add Funds"      (omit to hide button)
 *  footerBtnVariant — 'primary'|'teal'|'green'|'amber'|'red'  (default: 'primary')
 *  onFooterBtn — click handler for the CTA button
 *  className   — extra classes on the outer wrapper
 */
export default function KpiTile({
  icon,
  iconVariant = "teal",
  label,
  sub,
  value,
  delta,
  deltaType = "positive",
  footerText,
  footerBtn,
  footerBtnVariant = "primary",
  onFooterBtn,
  className = "",
}) {
  return (
    <div className={`kpi-tile ${className}`}>
      {/* ── Main body ── */}
      <div className="kpi-tile-body">
        {/* Icon */}
        {icon && (
          <div className={`kpi-icon kpi-icon-${iconVariant}`}>
            {icon}
          </div>
        )}

        {/* Label + sub */}
        <div className="kpi-meta">
          <span className="kpi-label">{label}</span>
          {sub && <span className="kpi-sub">{sub}</span>}
        </div>

        {/* Value + delta */}
        <div className="kpi-values">
          <span className="kpi-value">{value}</span>
          {delta && (
            <span className={`kpi-delta-${deltaType}`}>{delta}</span>
          )}
        </div>
      </div>

      {/* ── Optional footer strip ── */}
      {(footerText || footerBtn) && (
        <div className="kpi-footer">
          {footerText && (
            <span className="kpi-footer-text">{footerText}</span>
          )}
          {footerBtn && (
            <button
              onClick={onFooterBtn}
              className={`btn-kpi-${footerBtnVariant}`}
            >
              {footerBtn}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
