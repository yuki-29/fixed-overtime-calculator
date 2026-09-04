const LABEL_COLUMN = 22;
const AMOUNT_COLUMN = 10;
const pattern = /[ -~｡-ﾟ]/;
const NOTES = [
  "法定時間外労働の割増率1.25倍のみを前提としています。深夜割増や休日割増は含みません。",
  "実際の残業時間がみなし残業時間を超えた月は、超過分の割増賃金を別途支払う必要があります。",
  "定額残業代が有効とされるには、通常の労働時間の賃金部分と割増賃金部分を判別できること、およびその手当が時間外労働の対価であることが必要です。",
  "総支給額は、家族手当・通勤手当など割増賃金の基礎から除外される賃金を除いた額を入力してください。除外できるかは名称ではなく実質で判断されます。",
  "本ツールの結果は目安です。実際の賃金設計は社会保険労務士等の専門家にご確認ください。",
];

export const buildReport = (result) => {
  return [
    "【入力】",
    ` ${padEndByWidth("総支給額:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.total), AMOUNT_COLUMN)}`,
    ` ${padEndByWidth("月平均所定労働時間:", LABEL_COLUMN)}${padStartByWidth(formatHours(result.monthlyHours), AMOUNT_COLUMN)}`,
    ` ${padEndByWidth("みなし残業時間:", LABEL_COLUMN)}${padStartByWidth(formatHours(result.overtimeHours), AMOUNT_COLUMN)}`,
    "",
    "【内訳】",
    ` ${padEndByWidth("基本給:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.baseSalary), AMOUNT_COLUMN)}`,
    ` ${padEndByWidth("定額残業代:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.fixedAmount), AMOUNT_COLUMN)}`,
    "----------------------------------",
    ` ${padEndByWidth("合計:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.total), AMOUNT_COLUMN)}`,
    "",
    ` みなし残業 ${result.overtimeHours}時間分の定額残業代は${formatYen(result.fixedAmount)}です。`,
    "",
    "【単価】",
    ` ${padEndByWidth("基礎時給:", LABEL_COLUMN)}${padStartByWidth(formatYen(result.hourlyWage, 2), AMOUNT_COLUMN)}`,
    ` ${padEndByWidth("割増単価(1.25倍):", LABEL_COLUMN)}${padStartByWidth(formatYen(result.premiumUnitWage, 2), AMOUNT_COLUMN)}`,
    "",
    "【注意】",
    ...NOTES.map((note) => `・${note}`),
  ].join("\n");
};

const formatYen = (amount, fractionDigits = 0) => {
  return `${amount.toLocaleString("ja-JP", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}円`;
};

const formatHours = (hours) => {
  return `${hours}時間`;
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
