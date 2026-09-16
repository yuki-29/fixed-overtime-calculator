const PREMIUM_RATE = 1.25;
const BASE_SALARY_ROUNDING_UNIT = 100;

export const calculate = ({ total, monthlyHours, overtimeHours }) => {
  const ratio = 1 + (PREMIUM_RATE * overtimeHours) / monthlyHours;
  // 実務の慣習に合わせて基本給を100円単位に切り捨て、差額は定額残業代に寄せる
  const baseSalary =
    Math.floor(total / ratio / BASE_SALARY_ROUNDING_UNIT) *
    BASE_SALARY_ROUNDING_UNIT;
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
