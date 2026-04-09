// src/components/ui/StatusBadge.jsx
// Pill badge used in transaction tables, payroll rows, etc.

/**
 * Props:
 *  status — 'success' | 'pending' | 'failed' | 'onhold' | 'paid' | 'due' | 'overdue'
 *  label  — override display text (default: capitalised status)
 */

const STATUS_MAP = {
  success: { cls: "status-success", text: "Success" },
  paid:    { cls: "status-paid",    text: "Paid"    },
  pending: { cls: "status-pending", text: "Pending" },
  due:     { cls: "status-due",     text: "Due"     },
  failed:  { cls: "status-failed",  text: "Failed"  },
  overdue: { cls: "status-overdue", text: "Overdue" },
  onhold:  { cls: "status-onhold",  text: "On Hold" },
  "on hold":{ cls: "status-onhold", text: "On Hold" },
};

export default function StatusBadge({ status = "pending", label }) {
  const key    = status.toLowerCase();
  const config = STATUS_MAP[key] ?? { cls: "status-onhold", text: status };

  return (
    <span className={config.cls}>
      {label ?? config.text}
    </span>
  );
}
