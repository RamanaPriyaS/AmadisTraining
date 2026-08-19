const PEAK_MONTHS = new Set([6, 7, 8, 12]);
const SHOULDER_MONTHS = new Set([3, 4, 5, 9, 10]);

function seasonMultiplier(date) {
  const month = date.getUTCMonth() + 1;
  if (PEAK_MONTHS.has(month)) return 1.3;
  if (SHOULDER_MONTHS.has(month)) return 1.1;
  return 1.0;
}

function occupancyMultiplier(occupancyRate) {
  if (occupancyRate >= 0.9) return 1.3;
  if (occupancyRate >= 0.7) return 1.15;
  if (occupancyRate >= 0.5) return 1.05;
  return 1.0;
}

export function priceForNight(basePrice, date, occupancyRate = 0) {
  const season = seasonMultiplier(date);
  const occupancy = occupancyMultiplier(occupancyRate);
  const price = Math.round(basePrice * season * occupancy * 100) / 100;
  return {
    date: date.toISOString().slice(0, 10),
    base: basePrice,
    seasonMultiplier: season,
    occupancyMultiplier: occupancy,
    price,
  };
}

export async function computeStayPrice(basePrice, checkIn, checkOut, totalQuantity, getBookedCountForNight) {
  const nights = [];
  const cursor = new Date(checkIn);
  while (cursor < checkOut) {
    const bookedCount = await getBookedCountForNight(new Date(cursor));
    const occupancyRate = totalQuantity > 0 ? bookedCount / totalQuantity : 0;
    nights.push(priceForNight(basePrice, new Date(cursor), occupancyRate));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  const total = Math.round(nights.reduce((sum, n) => sum + n.price, 0) * 100) / 100;
  return { nights, total, nightCount: nights.length };
}
