const LABEL_COLUMN = 18;
const AMOUNT_COLUMN = 10;
const pattern = /[ -~｡-ﾟ]/;

export const buildReport = (result) => {
  return [
    "【内訳】",
    ` ${padEndByWidth("基本給:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.baseSalary), AMOUNT_COLUMN)}`,
    ` ${padEndByWidth("定額残業代:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.fixedAmount), AMOUNT_COLUMN)}`,
    "------------------------------",
    ` ${padEndByWidth("合計:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.total), AMOUNT_COLUMN)}`,
    "",
    ` みなし残業 ${result.overtimeHours}時間分の定額残業代は${formatYen(result.fixedAmount)}です。`,
    "",
    "【単価】",
    ` ${padEndByWidth("基礎時給:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.hourlyWage, 2), AMOUNT_COLUMN)}`,
    ` ${padEndByWidth("割増単価(1.25倍):", LABEL_COLUMN)}${padStartByWidth(formatYen(result.premiumUnitWage, 2), AMOUNT_COLUMN)}`,
  ].join("\n");
};

const formatYen = (amount, fractionDigits = 0) => {
  return `${amount.toLocaleString("ja-JP", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}円`;
};

const displayWidth = (text) => {
  let width = 0;
  for (const char of text) {
    if (pattern.test(char)) {
      width += 1;
    } else {
      width += 2;
    }
  }
  return width;
};

const padEndByWidth = (text, columnSize) => {
  const space = columnSize - displayWidth(text);
  return `${text}${" ".repeat(Math.max(space, 0))}`;
};

const padStartByWidth = (text, columnSize) => {
  const space = columnSize - displayWidth(text);
  return `${" ".repeat(Math.max(space, 0))}${text}`;
};
