export function isInBetween(data: any, first: any, last: any): boolean {
    if (data >= first && data <= last && first < last) {
      return true;
    } else return false;
  }
  
  export const padDateMonth = (val: string | number) => {
    return `${val}`.padStart(2, "0");
  };
  
  export function getTotalDaysInAdMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }
  