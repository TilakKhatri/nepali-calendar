import { getTotalDaysInBsMonth } from "./bsDate";
import { CalendarType, IDateObject } from "../types/main";
import { isInBetween, getTotalDaysInAdMonth } from "../utils";
import {
  minBsYear,
  maxBsYear,
  minAdYear,
  maxAdYear,
  minAdDate,
  minAdMonth,
} from "./data";

export const isMonthValid = (
  month: number | string,
  throwError?: boolean
): boolean => {
  const m = Number(month);
  const valid = m >= 1 && m <= 12;
  if (!valid && throwError) {
    throw new RangeError(`Month must be between 1 and 12, got ${month}`);
  }
  return valid;
};

function isDateValid(
  dateObj: IDateObject,
  minYear: number,
  maxYear: number,
  getTotalDays: (year: number, month: number) => number,
  throwError?: boolean
): boolean {
  const { year, month, date } = dateObj;
  if (!isInBetween(year, minYear, maxYear)) {
    if (throwError) throw new RangeError(`Year must be between ${minYear} and ${maxYear}, got ${year}`);
    return false;
  }
  if (!isMonthValid(month, throwError)) return false;
  const totalDays = getTotalDays(year, month);
  if (date > totalDays) {
    if (throwError) throw new RangeError(`Date must be between 1 and ${totalDays} for year ${year}, month ${month}, got ${date}`);
    return false;
  }
  return true;
}

export const isBsDateValid = (
  { year, month, date }: IDateObject,
  throwError?: boolean
): boolean => {
  if (!isInBetween(year, minBsYear, maxBsYear)) {
    if (throwError) throw new RangeError(`Year must be between ${minBsYear} and ${maxBsYear}, got ${year}`);
    return false;
  }
  if (!isMonthValid(month, throwError)) return false;
  const totalDays = getTotalDaysInBsMonth(year, month);
  if (date > totalDays) {
    if (throwError) throw new RangeError(`Date must be between 1 and ${totalDays} for year ${year}, month ${month}, got ${date}`);
    return false;
  }
  return true;
};

export const isAdDateValid = (dateObj: IDateObject, throwError?: boolean) =>
  isDateValid(dateObj, minAdYear, maxAdYear, getTotalDaysInAdMonth, throwError);

export const isInValidRange = (
  dateObj: IDateObject,
  calendarType: CalendarType,
  throwError: boolean = false
): boolean => {
  if (calendarType === "BS") {
    return isBsDateValid(dateObj, throwError);
  } else {
    return isAdDateValid(dateObj, throwError);
  }
};

type DateFormat = {
  yyyy?: number;
  mm?: number;
  m?: number;
  dd?: number;
  d?: number;
};

export function isDateValidWithFormat(
  input: string,
  format: string,
  throwError?: boolean
): boolean {
  if (!format || !input) {
    if (throwError) {
      throw new Error(
        `Date provided or Format  isn't supported. Got date=${input} and format =${format}`
      );
    }
    return false;
  }
  format = String(format)?.toLocaleLowerCase(); // default format
  const parts = input.match(/(\d+)/g);

  if (parts) {
    let i = 0;
    const fmt: DateFormat = {};

    format.replace(/(yyyy|dd|d|mm|m)/g, function (part) {
      fmt[part as keyof DateFormat] = i++;
      return "";
    });

    const yearIndex = fmt["yyyy"];
    const monthIndex = fmt["mm"] ?? fmt["m"];
    const dateIndex = fmt["dd"] ?? fmt["d"];

    if (yearIndex === undefined) {
      if (throwError)
        throw new TypeError(
          `Year isn't Provided in the given date input or the format doesn't contain correct combination of 'yyyy'.  Acceptable formats are the pemutation of 'yyyy', 'mm' and 'dd'  instead got ${format} `
        );
      return false;
    }
    if (monthIndex === undefined) {
      if (throwError)
        throw new TypeError(
          `Month isn't Provided in the given date input or the format doesn't contain correct combination of 'mm' | 'm'. Acceptable formats are the pemutation of 'yyyy', 'mm','m','d', and 'dd'  instead got ${format} `
        );
      return false;
    }
    if (dateIndex === undefined) {
      if (throwError)
        throw new TypeError(
          `Date isn't Provided in the given date input or the format doesn't contain correct combination of 'dd' | 'd'. Acceptable formats are the pemutation of 'yyyy', 'mm','m', 'd', and 'dd'  instead got ${format} `
        );
      return false;
    }
    const year = parts[yearIndex];
    const month = parts[monthIndex];
    const date = parts[dateIndex];

    if (!year || !month || !date) {
      if (throwError) {
        throw new Error("Invalid date");
      }
      return false;
    }

    return true;
  } else {
    if (throwError)
      throw new TypeError(
        "Passed Input isn't a valid date. Please check again.  Acceptable formats are the pemutation of 'yyyy', 'mm','m','d' and 'dd' "
      );
    return false;
  }
}
