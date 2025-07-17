import { ad2bs, bs2ad } from "./conversionMethods";
import { IDateObject } from "../types/main";

type DateOffset = {
  year?: number;
  month?: number;
  date?: number;
};

export function getNewBsDate(offset: DateOffset, dateObj: IDateObject) {
  const { year, month, date } = dateObj;

  const ad = bs2ad(year, month, date);

  const monthIndex = ad.month - 1;
  const adDate = new Date(
    ad.year + (offset?.year ?? 0),
    monthIndex + (offset?.month ?? 0),
    ad.date + (offset?.date ?? 0)
  );

  const bs = ad2bs(
    adDate.getFullYear(),
    adDate.getMonth() + 1,
    adDate.getDate()
  );
  return bs;
}

export function getNewAdDate(offset: DateOffset, dateObj: IDateObject) {
  const { year, month, date } = dateObj;

  const monthIndex = month - 1;
  const adDate = new Date(
    year + (offset?.year ?? 0),
    monthIndex + (offset?.month ?? 0),
    date + (offset?.date ?? 0)
  );

  const ad = {
    year: adDate.getFullYear(),
    month: adDate.getMonth() + 1,
    date: adDate.getDate(),
  };

  return ad;
}