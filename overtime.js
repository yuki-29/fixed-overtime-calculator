const PREMIUM_RATE = 1.25;

export const calculate = ({ total, monthlyHours, overtimeHours }) => {
  const ratio = 1 + (PREMIUM_RATE * overtimeHours) / monthlyHours;
  // 基本給を100円単位で切り捨て、差額を定額残業代に寄せることで内訳の合計を総支給額に一致させる
  const baseSalary = Math.floor(total / ratio / 100) * 100;
  const fixedAmount = total - baseSalary;
  const hourlyWage = baseSalary / monthlyHours; // 時給

  return {
    total,
    monthlyHours,
    overtimeHours,
    baseSalary,
    fixedAmount,
    hourlyWage,
    premiumUnitWage: hourlyWage * PREMIUM_RATE,
  };
};
