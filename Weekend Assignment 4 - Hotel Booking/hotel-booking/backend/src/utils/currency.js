// Central currency formatter — the app prices and displays everything in
// Indian Rupees. Keeping this in one place means email templates and any
// future server-rendered text stay consistent with the frontend.
const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatINR(amount) {
  return formatter.format(Number(amount) || 0);
}
