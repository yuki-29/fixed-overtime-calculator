export const buildReport = (result) => {
  return [
    `基本給: ${result.baseSalary.toLocaleString("ja-JP")}円`,
    `定額残業代: ${result.fixedAmount.toLocaleString("ja-JP")}円`,
    "----------------------------",
    `合計: ${result.total.toLocaleString("ja-JP")}円`,
  ].join("\n");
};
