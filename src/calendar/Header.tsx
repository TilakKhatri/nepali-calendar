import React from 'react';
import { ShowDropdownType, ShowYearDropdownType } from '../types/main';
import {
  getAdRangeForBsCalendar,
  getBsRangeForAdCalendar,
  getMonthNames,
  getNepaliNumber,
  getValidYears,
} from '../core/conversionMethods';

type OffsetChange = (a: number) => void;

type HeaderProps = {
  year: number;
  month: number;
  changeYear: OffsetChange; //TODO
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
  // around difference of 57 years between AD and BS
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
    <div>
      <div className="month-header">
        <div className="left-actions">
          <button
            style={{
              border: 'none',
              backgroundColor: 'inherit',
              color: 'White',
            }}
            title="Previous Year"
            onClick={() => changeYear(-1)}
            className="prev-year hand-cursor"
          >
            &#10094;&#10094;
          </button>
          <button
            style={{
              border: 'none',
              backgroundColor: 'inherit',
              color: 'White',
            }}
            title="Previous Month"
            onClick={() => changeMonth(-1)}
            className="prev-month hand-cursor"
          >
            &#10094;
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column',gap:0 }}>
          <div className="inline-dropdown-wrapper">
            <div>
              {!showMonthDropdown ? (
                <span>{currentMonthName} &nbsp;</span>
              ) : (
                <div tabIndex={0} className="inline-dropdown month-dropdown">
                  <div className="value" style={{ fontSize: 12, padding: 0 }}>
                    {currentMonthName}
                  </div>
                  <div className="inline-dropdown-container">
                    {allMonth &&
                      allMonth.map((m, i) => (
                        <div
                          key={m}
                          className={`inline-dropdown-item ${i === monthIndex ? 'selected' : ''}`}
                          onClick={() => {
                            const offset = i - monthIndex;
                            changeMonth(offset);
                          }}
                        >
                          {m}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div key={`${year}--`} tabIndex={0} className="inline-dropdown">
              {!showYearDropdown ? (
                <span>{currentYear || 0} &nbsp;</span>
              ) : (
                <>
                  <div className="value" style={{padding: 0 }}>
                    {currentYear || 0}
                  </div>
                  <div className="inline-dropdown-container">
                    {allYears.map((m) => (
                      <div
                        key={m}
                        className={`inline-dropdown-item ${m === year ? 'selected' : ''}`}
                        onClick={() => {
                          const offset = Number(m) - (year || 0);
                          changeYear(offset);
                        }}
                      >
                        {isAD ? m : getNepaliNumber(m)}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          {showExtra && (
            <div className="flex" style={{ justifyContent: 'center' }}>
              <div style={{ fontSize: 12 }}>
                {from.monthName}/{to.monthName} &nbsp;
              </div>
              <div
                key={`${year}--`}
                tabIndex={0}
                className="inline-dropdown"
                style={{ fontSize: 12 }}
              >
                {from.year}
                {from.year !== to.year ? `/${String(to.year).slice(-2)}` : ''}
              </div>
            </div>
          )}
        </div>

        <div className="right-actions">
          <button
            title="Next Month"
            style={{
              border: 'none',
              backgroundColor: 'inherit',
              color: `${reachedMaxYear && month >= 9 ? 'gray' : 'white'}`,
            }}
            disabled={reachedMaxYear && month >= 9}
            onClick={() => {
              changeMonth(1);
            }}
            className="next-month hand-cursor"
          >
            &#10095;
          </button>
          <button
            style={{
              border: 'none',
              backgroundColor: 'inherit',
              color: `${reachedMaxYear ? 'gray' : 'white'}`,
            }}
            onClick={() => {
              changeYear(1);
            }}
            disabled={reachedMaxYear}
            title="Next Year"
            className="next-year hand-cursor"
          >
            &#10095;&#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
