const LABEL_COLUMN = 15;
const AMOUNT_COLUMN = 10;
const pattern = /[ -~｡-ﾟ]/;

export const buildReport = (result) => {
  return [
    "【内訳】",

    ` ${padEndByWidth("基本給:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.baseSalary), AMOUNT_COLUMN)}`,
    ` ${padEndByWidth("定額残業代:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.fixedAmount), AMOUNT_COLUMN)}`,
    "---------------------------",
    ` ${padEndByWidth("合計:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.total), AMOUNT_COLUMN)}`,
  ].join("\n");
};

const formatYen = (amount) => {
  return `${amount.toLocaleString("ja-JP")}円`;
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
