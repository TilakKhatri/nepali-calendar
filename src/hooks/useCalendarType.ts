import { useState } from "react";
import { CalendarType } from "../types/main";

function useCalendarType(calendarTypeFromProps: CalendarType): CalendarType {
    const [calendarType] = useState(calendarTypeFromProps ?? "BS");
  
    return calendarType;
  }
  
  export default useCalendarType;
  