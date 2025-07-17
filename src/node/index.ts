import { getTotalDaysInBsMonth } from "../core/bsDate";
import parseDate from "../core/parser";
import {
  isMonthValid,
  isBsDateValid,
  isAdDateValid,
  isInValidRange,
  isDateValidWithFormat
} from "../core/validator";
import { format } from "../core/format";
import {
  ad2bs,
  bs2ad,
  getMonthNames,
  getWeekNames,
  getValidYears,
  getNepaliNumber,
//   getBsRangeForAdCalendar,
  getAdRangeForBsCalendar,
  getBsInfoOfoffsetDate
} from "../core/conversionMethods";

console.log("\n=== Date Conversion Tests ===");
console.log("ad2bs(2024, 1, 15):", ad2bs(2024, 2, 31));
console.log("bs2ad(2081, 11, 19):", bs2ad(2081, 11, 19));
/*
console.log("bs2ad(2080, 10, 2):", bs2ad(2080, 10, 2));

console.log("\n=== Month and Week Names Tests ===");
console.log("getMonthNames('np', 'full'):", getMonthNames("np", "full"));
console.log("getMonthNames('en', 'short'):", getMonthNames("en", "short"));
console.log("getWeekNames('np', 'full'):", getWeekNames("np", "full"));

console.log("\n=== Valid Years Tests ===");
console.log("getValidYears('np', 'BS'):", getValidYears("np", "BS"));
console.log("getValidYears('en', 'AD'):", getValidYears("en", "AD"));

console.log("\n=== Nepali Number Tests ===");
console.log("getNepaliNumber(2081):", getNepaliNumber(2081));
console.log("getNepaliNumber(281):", getNepaliNumber(281));
console.log("getNepaliNumber(2024):", getNepaliNumber(2024));

console.log("\n=== Range Tests ===");
console.log("getBsRangeForAdCalendar(2024, 1):", getBsRangeForAdCalendar(2024, 1));
console.log("getAdRangeForBsCalendar(2080, 10):", getAdRangeForBsCalendar(2080, 10));

console.log("\n=== Offset Date Tests ===");
console.log("getBsInfoOfoffsetDate(2080, 10):", getBsInfoOfoffsetDate(2080, 10));
console.log("getBsInfoOfoffsetDate(2080, 10, { year: 1, month: 2 }):", getBsInfoOfoffsetDate(2080, 10, { year: 1, month: 2 }));

console.log("getTotalDaysInBsMonth(2081, 2):", getTotalDaysInBsMonth(2081, 2));
console.log("parseDate('2082-02-15', 'yyyy-mm-dd'):", parseDate("2082-02-15", "yyyy-mm-dd"));

// Test isMonthValid
console.log("isMonthValid(5):", isMonthValid(5));
console.log("isMonthValid('13'):", isMonthValid("13"));

// Test isBsDateValid
console.log("isBsDateValid({ year: 2081, month: 2, date: 15 }):", isBsDateValid({ year: 2081, month: 2, date: 15 }));
console.log("isBsDateValid({ year: 2081, month: 13, date: 1 }):", isBsDateValid({ year: 2081, month: 13, date: 1 }));

// Test isAdDateValid
console.log("isAdDateValid({ year: 2023, month: 5, date: 10 }):", isAdDateValid({ year: 2023, month: 5, date: 10 }));
console.log("isAdDateValid({ year: 1800, month: 1, date: 1 }):", isAdDateValid({ year: 1800, month: 1, date: 1 }));

// Test isInValidRange
console.log("isInValidRange({ year: 2081, month: 2, date: 15 }, 'BS'):", isInValidRange({ year: 2081, month: 2, date: 15 }, "BS"));
console.log("isInValidRange({ year: 2023, month: 5, date: 10 }, 'AD'):", isInValidRange({ year: 2023, month: 5, date: 10 }, "AD"));

// Test isDateValidWithFormat
console.log("isDateValidWithFormat('2081-02-15', 'yyyy-mm-dd'):", isDateValidWithFormat("2081-02-15", "yyyy-mm-dd"));
console.log("isDateValidWithFormat('15/02/2081', 'dd/mm/yyyy'):", isDateValidWithFormat("15/02/2081", "dd/mm/yyyy"));

*/