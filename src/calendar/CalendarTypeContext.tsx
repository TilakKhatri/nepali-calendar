import React,{ createContext,useContext, useState, useEffect } from "react";
import { CalendarType } from "../types/main";


const CalendarTypeContext = createContext<{calendarType: CalendarType, setCalendarType: (calendarType: CalendarType) => void} | undefined>(undefined);


export const CalendarTypeProvider: React.FC<{children: React.ReactNode, initialCalendarType?: CalendarType}> = ({children, initialCalendarType = "BS"}) => {
    const [calendarType, setCalendarType] = useState<CalendarType>(initialCalendarType);

    // Update calendar type when initialCalendarType prop changes
    useEffect(() => {
        setCalendarType(initialCalendarType);
    }, [initialCalendarType]);

    return (
        <CalendarTypeContext.Provider value={{calendarType, setCalendarType}}>
            {children}
        </CalendarTypeContext.Provider>
    )
};

export function useCalendarType() {
    const context = useContext(CalendarTypeContext);
    if (!context) {
        throw new Error("useCalendarType must be used within a CalendarTypeProvider");
    }
    return context;
}

// Custom hook that accepts initial calendar type (for backward compatibility)
export function useCalendarTypeWithInitial(calendarTypeFromProps?: CalendarType): CalendarType {
    const { calendarType } = useCalendarType();
    return calendarTypeFromProps ?? calendarType;
}