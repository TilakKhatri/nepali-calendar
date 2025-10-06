import React, { useState, useEffect } from "react";

import NepaliCalendar from "../calendar/NepaliCalendar";
import CalendarIcon from "../assets/CalendarIcon";
import CrossIcon from "../assets/CrossIcon";

import { usePopper } from "./usepopper";
import useCalendarType from "../hooks/useCalendarType";

import {
  changeDateFromOneFormatToAnother,
  dateFormatter,
  parseDate,
  getDateObj,
} from "../date-fns";
import { isDateValidWithFormat } from "../core/validator";
import { formatBsDate } from "../core/conversionMethods";
import { IDatePicker } from "../types/main";

const random_id = `rl-nepali-${Math.random()}`;

const DatePicker = (props: IDatePicker) => {
  const {
    value,
    size = "small",
    onChange,
    isClearable = true,
    dateFormat = "yyyy-mm-dd",
    calendarType: calendarTypeFromProps,
    showMonthDropdown,
    placehoder,
    hideOnSelect = true,
    onSelect,
    inputStyle,
    inputClassName,
    placeholderColor,
    calendarIconStyle,
    calendarIconClassName,
    crossIconStyle,
    crossIconClassName,
    theme,
    calendarStyle,
    calendarClassName,
    ...otherProps
  } = props;

  const calendarType = useCalendarType(calendarTypeFromProps);

  // This is the data that is sent to the NepaliCalendar
  const [selectedDate, setSelectedDate] = useState(value);

  //This is what is shown in input field;
  const [entetereDate, setEnteredDate] = useState("");
  //Eventually selectedDate and enteredDate is supposed to be equal but not neccesary. When the user is typing on the input field only enteredDate is selected and when s/he stops or blurs or presses enter then only the states are synced.

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const { popupRef, inputRef, isVisible, setIsVisible, containerRef } =
    usePopper();
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;

    const today = dateFormatter(new Date(), dateFormat);

    const dateStringOfSelectedDate = parseDate(
      selectedDate || today,
      dateFormat
    );

    const obj = getDateObj(selectedDate || today, dateFormat);

    //TODO static
    const acceptableFormat = [
      "dd-mm-yyyy",
      "dd/mm/yyyy",
      "yyyy-mm-dd",
      "yyyy/mm/dd",
      dateFormat,
    ];

    acceptableFormat.forEach((format, index) => {
      if (isDateValidWithFormat(value, format)) {
        const yearValidator = /\d+.\d+.(\d){4}/;
        const bool =
          index === 1 || index === 2 ? value.match(yearValidator) : true;

        if (bool) {
          const formattedNewDate = changeDateFromOneFormatToAnother(
            value,
            format,
            dateFormat
          );

          setSelectedDate(formattedNewDate);
          setEnteredDate(formattedNewDate);
        }
      }
    });

    if (!isNaN(+value)) {
      if (value.length === 2) {
        const totalDaysInMonth = new Date(
          dateStringOfSelectedDate.getFullYear(),
          dateStringOfSelectedDate.getMonth() + 1,
          0
        ).getDate();

        if (obj && +value <= totalDaysInMonth) {
          obj.date = +value;
          const newDate = formatBsDate(obj, dateFormat);
          setSelectedDate(newDate);
        }
      }
      if (value.length === 4) {
        if (obj) {
          obj.year = +value;
          const newDate = formatBsDate(obj, dateFormat);
          setSelectedDate(newDate);
        }
      }
    }
    setEnteredDate(value);
  };

  // Compose style for wrapper: theme CSS vars + placeholderColor
  const wrapperStyle = (theme || placeholderColor)
    ? {
        ...(theme ? Object.keys(theme).reduce((acc, key) => {
          acc[`--${key}`] = theme[key];
          return acc;
        }, {} as any) : {}),
        ...(placeholderColor ? { '--datepicker-placeholder-color': placeholderColor } : {}),
      }
    : undefined;

  return (
    <div
      id={random_id}
      className="rl-nepali-datepicker-wrapper"
      ref={containerRef}
      style={wrapperStyle}
    >
      {isClearable && (
        <CrossIcon
          className={`cross-icon${crossIconClassName ? ' ' + crossIconClassName : ''}`}
          visible={!!selectedDate || !!entetereDate}
          onClick={() => {
            setSelectedDate("");
            setEnteredDate("");
            typeof onChange === "function" && onChange("");
          }}
          style={crossIconStyle}
        />
      )}
      <div className="input-wrapper">
        <input
          ref={inputRef}
          onClick={() => setIsVisible(true)}
          className={`rl-nepali-datepicker-input ${size}${inputClassName ? ' ' + inputClassName : ''}`}
          value={entetereDate || selectedDate} 
          placeholder={`${placehoder ?? dateFormat} (${calendarType})`}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsVisible(false);
              inputRef.current?.blur();
            }
          }}
          style={inputStyle}
        />
        <span className="icon-left">
          <CalendarIcon
            onClick={() => setIsVisible(true)}
            className={`rl-nepali-datepicker-icon hand-cursor${calendarIconClassName ? ' ' + calendarIconClassName : ''}`}
            style={calendarIconStyle}
            color={calendarIconStyle && calendarIconStyle.color ? calendarIconStyle.color : (crossIconStyle && crossIconStyle.color ? crossIconStyle.color : undefined)}
          />
        </span>
      </div>
      {isVisible && (
        <div ref={popupRef} style={{ zIndex: 999, ...calendarStyle }} className={calendarClassName}>
          <NepaliCalendar
            value={selectedDate}
            showExtra={true}
            disableDate={props.disableDate}
            shouldPressOK={true}
            calendarType={calendarType}
            dateFormat={dateFormat}
            showMonthDropdown={showMonthDropdown}
            onSelect={(formattedDate, adDate, bsDate, dateString) => {
              hideOnSelect && setIsVisible(false);
              setEnteredDate(formattedDate);
              typeof onChange === "function" &&
                onChange(formattedDate, adDate, bsDate, dateString);
            }}
            theme={theme}
            calendarStyle={calendarStyle}
            calendarClassName={calendarClassName}
            {...otherProps}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
