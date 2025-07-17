import React from 'react';
import '../styles.css';
import { ShowDropdownType, ShowYearDropdownType } from '../types/main';
import {
  getAdRangeForBsCalendar,
  getBsRangeForAdCalendar,
  getMonthNames,
  getNepaliNumber,
  getValidYears,
} from '../core/conversionMethods';

type OffsetChange = (offset: number) => void;

type HeaderProps = {
  year: number;
  month: number;
  changeYear: OffsetChange;
  changeMonth: OffsetChange;
  isAD: boolean;
  showMonthDropdown: ShowDropdownType;
  showYearDropdown: ShowYearDropdownType;
  showExtra: boolean;
};

const Header = ({
  year,
  month,
  changeYear,
  changeMonth,
  isAD,
  showMonthDropdown,
  showYearDropdown,
  showExtra,
}: HeaderProps) => {
  const maxAD = 2035;
  const maxBS = 2092;
  const monthIndex = month - 1;

  const allNepaliMonth = getMonthNames('np', 'full');
  const allEnglishMonth = getMonthNames('en', 'full');
  const allMonth = isAD ? allEnglishMonth : allNepaliMonth;
  const currentMonthName = allMonth ? allMonth[monthIndex] : '';
  const currentYear = isAD ? year : getNepaliNumber(year ?? 0);
  const allYears = isAD ? getValidYears('en', 'AD') : getValidYears('en', 'BS');

  const alternateCalendarTypeRange = isAD
    ? getBsRangeForAdCalendar(year, month)
    : getAdRangeForBsCalendar(year, month);

  const { from, to } = alternateCalendarTypeRange;
  const reachedMaxYear = isAD ? year >= maxAD : year >= maxBS;

  return (
    <div className="month-header">
      <div className="left-actions">
        <button
          type="button"
          aria-label="Previous Year"
          onClick={() => changeYear(-1)}
          disabled={year <= (isAD ? 1944 : 2000)}
          className="prev-year hand-cursor btn-transparent"
        >
          &#10094;&#10094;
        </button>
        <button
          type="button"
          className="btn-transparent"
          title="Previous Month"
          aria-label="Previous Month"
          onClick={() => changeMonth(-1)}
          disabled={year <= (isAD ? 1944 : 2000) && month === 1}
        >
          &#10094;
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="month-header-content">
          {!showMonthDropdown ? (
            <span>{currentMonthName} &nbsp;</span>
          ) : (
            <select
              className="rl-nepali-calendar__month-select"
              value={monthIndex}
              onChange={(e) => changeMonth(+e.target.value - monthIndex)}
            >
              {allMonth.map((m, i) => (
                <option value={i} key={m}>
                  {m}
                </option>
              ))}
            </select>
          )}
          <div key={`${year}--`} tabIndex={0} className="inline-dropdown">
            <div className="value"></div>
            {!showYearDropdown ? (
              <span>{currentYear || ''}</span>
            ) : (
              <select value={year} onChange={(e) => changeYear(+e.target.value - year)}>
                {allYears.map((y) => (
                  <option value={y} key={y}>
                    {isAD ? y : getNepaliNumber(y)}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        {showExtra && (
          <div className="flex" style={{justifyContent: 'center'}}>
            <span>
              {from.monthName}/{to.monthName} - {from.year}
              {from.year !== to.year ? `/${String(to.year).slice(-2)}` : ''}
            </span>
          </div>
        )}
      </div>

      <div className="right-actions">
        <button
          type="button"
          aria-label="Next Month"
          onClick={() => changeMonth(1)}
          disabled={reachedMaxYear && month >= 12}
          className="next-month hand-cursor btn-transparent"
        >
          &#10095;
        </button>
        <button
          type="button"
          aria-label="Next Year"
          onClick={() => changeYear(1)}
          disabled={reachedMaxYear}
          className="next-year hand-cursor btn-transparent"
        >
          &#10095;&#10095;
        </button>
      </div>
    </div>
  );
};

export default Header;
