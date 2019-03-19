import TimeSpan from "./timespan";
export declare enum DateTimeComponent {
    year = 0,
    month = 1,
    date = 2
}
export default class DateTime {
    jsDate: Date;
    time: TimeSpan;
    year: number;
    month: number;
    date: number;
    /**
     * Create a DateTime from the current date and time according to system settings for timezone offset.
     */
    constructor();
    /**
     * Create a DateTime from js Date.
     * @param date The date you want to replicate
     */
    constructor(date: Date);
    /**
     * Create a DateTime from elapsed milliseconds since January 1, 1970
     * @param milliseconds Milliseconds elapsed since January 1, 1970
     */
    constructor(milliseconds: number);
    /**
     * Create a DateTime from properties of a Date/Time aka year, month, day, hours ...
     * @param year Integer value representing the year. Values from 0 to 99 map to the years 1900 to 1999.
     * @param month Integer value representing the month, beginning with 1 for January to 12 for December.
     * @param day Integer value representing the day of the month.
     * @param hours Integer value representing the hour of the day.
     * @param minutes Integer value representing the minute segment of a time.
     * @param seconds Integer value representing the second segment of a time.
     * @param milliseconds Integer value representing the millisecond segment of a time.
     */
    constructor(year: number, month: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number);
    private equality;
    equals(date: Date | DateTime | number, check?: DateTimeComponent, fullCheck?: boolean): boolean;
    addDays(days: number): DateTime;
    substractDays(days: number): DateTime;
    daysBetween(date: Date | DateTime): number;
    [Symbol.toPrimitive](hint: string): string | number;
}
