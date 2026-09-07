import enquirer from "enquirer";

export const askTotal = async () => {
  const prompt = new enquirer.Input({
    message: "総支給額を入力してください",
  });
  const answer = await prompt.run();
  return Number(answer);
};

export const askMonthlyHours = async () => {
  const prompt = new enquirer.Input({
    message: "所定労働時間を入力してください",
  });
  const answer = await prompt.run();
  return Number(answer);
};

export const askOvertimeHours = async () => {
  const prompt = new enquirer.Input({
    message: "みなし残業時間を入力してください",
  });
  const answer = await prompt.run();
  return Number(answer);
};
