import enquirer from "enquirer";
const OVERTIME_LIMIT = 60;

export const askTotal = async () => {
  const prompt = new enquirer.Input({
    message: "総支給額を入力してください",
    validate: (value) => {
      const result = validatePositiveNumber(value);
      if (result !== true) return result;
      if (!Number.isInteger(Number(value))) return "整数を入力してください。";
      return true;
    },
  });
  const answer = await prompt.run();
  return Number(answer);
};

export const askMonthlyHours = async () => {
  const prompt = new enquirer.Input({
    message: "所定労働時間を入力してください",
    validate: validatePositiveNumber,
  });
  const answer = await prompt.run();
  return Number(answer);
};

export const askOvertimeHours = async () => {
  const prompt = new enquirer.Input({
    message: "みなし残業時間を入力してください",
    validate: (value) => {
      const result = validatePositiveNumber(value);
      if (result !== true) return result;
      if (Number(value) > OVERTIME_LIMIT)
        return `${OVERTIME_LIMIT}時間以下で入力してください。`;
      return true;
    },
  });
  const answer = await prompt.run();
  return Number(answer);
};

const validatePositiveNumber = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "数値を入力してください。";
  if (number <= 0) return "0より大きい金額を入力してください。";
  return true;
};
