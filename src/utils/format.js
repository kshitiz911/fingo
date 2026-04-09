/**
 * Format a number as Indian Rupee
 * formatINR(2485670) → "₹24,85,670"
 */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a delta with sign and color hint
 * formatDelta(3.42) → { label: "+3.42%", type: "positive" }
 */
export function formatDelta(value, suffix = '%') {
  const isPositive = value >= 0;
  return {
    label: `${isPositive ? '+' : ''}${value}${suffix}`,
    type: isPositive ? 'positive' : 'negative',
  };
}

/**
 * Format large numbers compactly
 * formatCompact(24800000) → "₹24.8M"
 */
export function formatCompact(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000)   return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000)     return `₹${(amount / 1000).toFixed(1)}k`;
  return `₹${amount}`;
}
