import { calculate } from "./overtime.js";
import { buildReport } from "./report.js";
import { askTotal, askMonthlyHours, askOvertimeHours } from "./cli.js";

const total = await askTotal();
const monthlyHours = await askMonthlyHours();
const overtimeHours = await askOvertimeHours();

console.log(buildReport(calculate({ total, monthlyHours, overtimeHours })));
