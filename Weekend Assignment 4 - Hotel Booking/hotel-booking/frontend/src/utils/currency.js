// Central currency formatter — the app prices and displays everything in
// Indian Rupees, with Indian-style digit grouping (e.g. ₹1,45,000).
const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

// Whole-rupee variant for compact spots (list cards, table cells) where
// showing paise adds noise without adding information.
const wholeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount) {
  return formatter.format(Number(amount) || 0);
}

export function formatCurrencyWhole(amount) {
  return wholeFormatter.format(Number(amount) || 0);
}
