const FULL_REFUND_HOURS_BEFORE = 48;
const PARTIAL_REFUND_HOURS_BEFORE = 24;
const PARTIAL_REFUND_PERCENT = 50;

export function computeRefund(checkInDate, totalPrice, now = new Date()) {
  const hoursUntilCheckIn = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  let percent;
  if (hoursUntilCheckIn >= FULL_REFUND_HOURS_BEFORE) {
    percent = 100;
  } else if (hoursUntilCheckIn >= PARTIAL_REFUND_HOURS_BEFORE) {
    percent = PARTIAL_REFUND_PERCENT;
  } else {
    percent = 0;
  }

  const amount = Math.round(totalPrice * (percent / 100) * 100) / 100;
  return { percent, amount, hoursUntilCheckIn: Math.round(hoursUntilCheckIn * 10) / 10 };
}

export const cancellationPolicySummary = {
  fullRefundHoursBefore: FULL_REFUND_HOURS_BEFORE,
  partialRefundHoursBefore: PARTIAL_REFUND_HOURS_BEFORE,
  partialRefundPercent: PARTIAL_REFUND_PERCENT,
};
