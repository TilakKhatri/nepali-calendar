import { isInBetween, getTotalDaysInAdMonth } from "../utils";

import { CalendarType } from "../types/main";
import parser from "./parser";
import { format } from "./format";
import { isInValidRange, isMonthValid, isBsDateValid } from "./validator";
import { getTotalDaysInBsMonth } from "./bsDate";
import * as BSdata from "./data";

const parseBsDate = parser;
const formatBsDate = format;

export { isInValidRange, isMonthValid, isBsDateValid };

export { formatBsDate, parseBsDate };
export { getTotalDaysInBsMonth };

const dataType = ["np", "rm", "en"];
const lengthType = ["full", "short", "min"];

type NameType = "monthName" | "dayName";
type Language = "np" | "rm" | "en";
type Length = "full" | "short" | "min";

type NameReturns = {
  full: string[];
  short: string[];
  min: string[];
};
export function getNames<T extends Length>(
    type: NameType,
    lang: Language,
    length?: T
  ): string[] {
    if (!["monthName", "dayName"].includes(type)) {
      throw new Error(`Type must be 'monthName' or 'dayName', got '${type}'`);
    }
    if (!["np", "rm", "en"].includes(lang)) {
      throw new Error(`Language must be 'np', 'rm', or 'en', got '${lang}'`);
    }
    if (length && !["full", "short", "min"].includes(length)) {
      throw new Error(`Length must be 'full', 'short', or 'min', got '${length}'`);
    }
    return length ? BSdata[lang][type][length] : BSdata[lang][type].full;
  }

export const getMonthNames = (
  lang: Language = "np",
  length: Length
): string[] => {
  const allMonths = getNames("monthName", lang, length);
  return allMonths;
};

export const getWeekNames = (lang: Language = "np", length: Length) => {
  const allMonths = getNames("dayName", lang, length);
  if (Array.isArray(allMonths)) return allMonths;
  return null;
};

//TODo
export function getValidYears(
  lang: Language,
  calendarType: CalendarType
): number[] | string[] {
  if (calendarType === "BS") {
    if (dataType.includes(lang)) {
      const allYears = Object.keys(BSdata.calendar_data);
      if (lang === "np" || lang === "rm") {
        const nepYears = allYears.map((a) => getNepaliNumber(a));
        return nepYears;
      } else {
        return allYears;
      }
    } else {
      console.error(
        `Expected paramters for getValidYears is one of the : ${dataType}`
      );
      const allYears = Object.keys(BSdata.calendar_data);
      if (lang === "np" || lang === "rm") {
        const nepYears = allYears.map((a) => getNepaliNumber(a));
        return nepYears;
      }
      return [];
    }
  } else {
    let arr = [];
    for (let i = BSdata.minAdYear; i <= BSdata.maxAdYear; i++) {
      arr.push(i);
    }
    //TODO
    return arr;
  }
}

// type EachNumeral = keyof typeof BSdata.nums;
// type Numeral = typeof BSdata.nums[EachNumeral];
export const getNepaliNumber = (n: number | string) => {
  if (isNaN(+n)) {
    throw new TypeError(`Expected Number  instead got ${typeof n} value=${n}`);
  }
  let nep = "";
  const str = String(n);
  for (let i = 0; i < str.length; i++) {
    nep += BSdata.npNumsArray[str[i] as any];
  }
  return nep;
};


type EachBSYear = keyof typeof BSdata.calendar_data;

const cache = {
    _cumulativeTotal: null as null | Record<number, number>,
    getCumulativeTotal() {
      if (this._cumulativeTotal) return this._cumulativeTotal;
      const years = Object.keys(BSdata.calendar_data);
      const startingYear = +years[0];
      const totalYears = years.length;
      const obj: Record<number, number> = {};
      for (let i = 0; i < totalYears; i++) {
        const yearIndex = startingYear + i;
        obj[yearIndex] =
          (i === 0 ? 0 : obj[yearIndex - 1]) +
          getYearCalendarData(yearIndex).slice(-1)[0];
      }
      this._cumulativeTotal = obj;
      return obj;
    },
  };

const countBSDaysFromBaseDateUsingAdDate = (
  year: number,
  month: number,
  day: number
) => {
  const { base_ad } = BSdata;

  const dateObj = { year, month: month - 1, day };
  const date1 = new Date(base_ad.year, base_ad.month, base_ad.day);
  const date2 = new Date(dateObj.year, dateObj.month, dateObj.day);

  const timeDiff = date2.getTime() - date1.getTime();

  const dayCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return dayCount;
};
/**
 * Returns the Index of week  0 for sunday and so on..
 * @param {number} daysCount - No. of days from the base bs
 */
const getDayIndex = (daysCount: number) =>
  ((daysCount % 7) + BSdata.base_bs.dayOfWeek) % 7;

/**
 * Safely get calendar data for a year as an array
 * @param year - BS year
 * @returns Array of days for each month in the year
 */
const getYearCalendarData = (year: number): number[] => {
  const yearData = BSdata.calendar_data[year as EachBSYear];
  if (!Array.isArray(yearData)) {
    throw new Error(`Invalid calendar data for year ${year}. Expected array, got ${typeof yearData}`);
  }
  return yearData;
};

//month =1 for Baisakh
//TODO error checking
export const ad2bs = (years: number, months: number, date: number) => {
  const { base_bs, calendar_data } = BSdata;
  const dayCount = countBSDaysFromBaseDateUsingAdDate(years, months, date);

    const cumulativeData = cache.getCumulativeTotal();
  const values = Object.values(cumulativeData);
  const yearIndex = values.findIndex((value) => (value as number) >= dayCount);
  
  let year = +base_bs.year + yearIndex;
  let offsetDays =
    yearIndex === 0 ? dayCount : dayCount - cumulativeData[year - 1];

  // Use the safe function to get year data
  const yearData = getYearCalendarData(year);

  let month = 0;

  // Calculate which month the offsetDays falls into
  while (month < 12 && yearData[month] <= offsetDays) {
    offsetDays -= yearData[month];
    month++;
  }

  // Handle edge case where month goes beyond 12
  if (month === 12) {
    month = 0;
    year = year + 1;
    // Get the next year's data safely
    getYearCalendarData(year);
  }



  return {
    year,
    month: month + 1, // one is added because month is 0 based
    date: offsetDays + 1,
    day: getDayIndex(dayCount),
  };
};

//month =1 for Baisakh
//TODO error checking
export const bs2ad = (year: number, month: number, day: number) => {
  const { base_ad, calendar_data } = BSdata;

  const cumulativeData = cache.getCumulativeTotal();

  let prevMonthCumulativeTotal = 0;
  const prevYearCumulativeTotal = cumulativeData[+year - 1];
  for (let i = 0; i < +month - 1; i++) {
    prevMonthCumulativeTotal += getYearCalendarData(+year)[i];
  }

  const countDays =
    prevYearCumulativeTotal + prevMonthCumulativeTotal + +day - 1;

  const date1 = new Date(base_ad.year, base_ad.month, base_ad.day);
  date1.setDate(date1.getDate() + countDays);

  const ad = {
    year: date1.getFullYear(),
    month: date1.getMonth() + 1,
    date: date1.getDate(),
    day: date1.getDay(),
  };
  return ad;
};

export const getStartingDayOfBsMonth = (year: number, month: number) => {
  const monthIndex = month - 1;
  const cumulativeData = cache.getCumulativeTotal();
  const prevYearTotal = cumulativeData[year - 1] || 0;
  let days = 0;
  for (let i = 0; i < monthIndex; i++) {
    days += getYearCalendarData(year)[i];
  }
  const daysCount = prevYearTotal + days;
  return getDayIndex(daysCount);
};

type DateDetail = {
  date: number;
  year: number;
  month: number;
  monthName: string;
};
type RangeDetail = {
  from: DateDetail;
  to: DateDetail;
};
// export const getBsRangeForAdCalendar = (
//   year: number,
//   month: number
// ): RangeDetail => {
//   const allNepaliMonth = getMonthNames("np", "full");

//   const bsfirst = ad2bs(year, month, 1);
//   const lastDate = getTotalDaysInAdMonth(year, month);
//   const bsLast = ad2bs(year, month, lastDate);

//   const firstMonth = allNepaliMonth[bsfirst.month - 1];
//   const lastMonth = allNepaliMonth[bsLast.month - 1];

//   return {
//     from: { ...bsfirst, monthName: firstMonth },
//     to: { ...bsLast, monthName: lastMonth },
//   };
// };
export const getAdRangeForBsCalendar = (
  year: number,
  month: number
): RangeDetail => {
  const allEnglishMonth = getMonthNames("en", "short");

  const adfirst = bs2ad(year, month, 1);
  const lastDate = getTotalDaysInBsMonth(year, month);
  const adLast = bs2ad(year, month, lastDate);

  const firstMonth = allEnglishMonth[adfirst.month - 1];
  const lastMonth = allEnglishMonth[adLast.month - 1];

  return {
    from: { ...adfirst, monthName: firstMonth },
    to: { ...adLast, monthName: lastMonth },
  };
};

type DateInfo = {
  month: number;
  year: number;
  totalDays: number;
};

//TODo Error
export const getBsInfoOfoffsetDate = (
  year: number,
  month: number,
  offset?: { year?: number; month?: number }
): DateInfo => {
  const yearOffset = year + (offset?.year ?? 0);
  const monthOffset = month + (offset?.month ?? 0);

  const newMonth = monthOffset % 12 || 12;
  const newYear = yearOffset + Math.floor(monthOffset / 12);

  const newMonthIndex = newMonth - 1;

  if (isInBetween(newYear, BSdata.minBsYear, BSdata.maxBsYear)) {
    const totalDays = getYearCalendarData(newYear)[newMonthIndex];
    return {
      month: newMonth,
      year: newYear,
      totalDays,
    };
  } else throw new Error("Error");
};