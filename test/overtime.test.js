import { test } from "node:test";
import assert from "node:assert/strict";
import { calculate } from "../overtime.js";

const result = calculate({
  total: 300000,
  monthlyHours: 160,
  overtimeHours: 30,
});

test("計算が正しいか", () => {
  assert.strictEqual(result.baseSalary, 243000);
  assert.strictEqual(result.fixedAmount, 57000);
  assert.strictEqual(result.hourlyWage, 1518.75);
});

test("内訳の合計が総支給額に一致する", () => {
  const cases = [
    { total: 299999, monthlyHours: 161.1, overtimeHours: 30.5 },
    { total: 300191, monthlyHours: 161.5, overtimeHours: 31 },
  ];
  for (const input of cases) {
    const result = calculate(input);
    assert.strictEqual(result.baseSalary + result.fixedAmount, result.total);
  }
});

test("基本給が100円単位に丸められる", () => {
  const result = calculate({
    total: 300000,
    monthlyHours: 160,
    overtimeHours: 20,
  });
  assert.strictEqual(result.baseSalary, 259400);
});

test("割増単価が時給の1.25倍になる", () => {
  assert.strictEqual(result.premiumUnitWage, result.hourlyWage * 1.25);
});
