const PREMIUM_RATE = 1.25;

export const calculate = ({ total, monthlyHours, overtimeHours }) => {
  const ratio = 1 + (PREMIUM_RATE * overtimeHours) / monthlyHours;
  const baseSalary = total / ratio; // 端数処理検討
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
