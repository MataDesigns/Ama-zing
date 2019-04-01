/**
 * @module DateTime
 */
import TimeSpan from "./timespan";
import "./number";
/**
 * Specifies the day of the week
 */
export declare enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
/**
 * Represents an instant in time, typically expressed as a date and time of day.
 */
export default class DateTime {
    private dateData;
    private static readonly TicksPerMillisecond;
    private static readonly TicksPerSecond;
    private static readonly TicksPerMinute;
    private static readonly TicksPerHour;
    private static readonly TicksPerDay;
    private static readonly MillisPerSecond;
    private static readonly MillisPerMinute;
    private static readonly MillisPerHour;
    private static readonly MillisPerDay;
    private static readonly DaysPerYear;
    private static readonly DaysPer4Years;
    private static readonly DaysPer100Years;
    private static readonly DaysPer400Years;
    private static readonly DaysTo1601;
    private static readonly DaysTo1899;
    private static readonly DaysTo1970;
    private static readonly DaysTo10000;
    private static readonly MinTicks;
    private static readonly MaxTicks;
    private static readonly MaxMillis;
    private static readonly DatePartYear;
    private static readonly DatePartDayOfYear;
    private static readonly DatePartMonth;
    private static readonly DatePartDay;
    private static DaysToMonth365;
    private static DaysToMonth366;
    private readonly internalTicks;
    /**
     * The year part of this DateTime. The value is between 1 and 9999.
     */
    readonly year: number;
    /**
     * The month part of this DateTime. The value is an integer between 1 and 12.
     */
    readonly month: number;
    /**
     * The day-of-month part of this DateTime. The value is between 1 and 31.
     */
    readonly day: number;
    /**
     * The day-of-year part of this DateTime. The value is between 1 and 366.
     */
    readonly dayOfYear: number;
    /**
     * The day-of-week part of this DateTime. The returned value
     * is an integer between 0 and 6, where 0 indicates Sunday, 1 indicates
     * Monday, 2 indicates Tuesday, 3 indicates Wednesday, 4 indicates
     * Thursday, 5 indicates Friday, and 6 indicates Saturday.
     */
    readonly dayOfWeek: DayOfWeek;
    /**
     * The hour part of this DateTime. The value is between 0 and 23.
     */
    readonly hour: number;
    /**
     * The minute part of this DateTime. The value is between 0 and 59.
     */
    readonly minute: number;
    /**
     * The second part of this DateTime. The value is between 0 and 59.
     */
    readonly second: number;
    /**
     * The millisecond part of this DateTime. The value is between 0 and 999.
     */
    readonly millisecond: number;
    /**
     * Returns the tick count for this DateTime. The returned value is
     * the number of 100-nanosecond intervals that have elapsed since 1/1/0001
     * 12:00am.
     */
    readonly ticks: number;
    /**
     * Initializes a new instance of the DateTime to the current date and time.
     */
    constructor();
    /**
     * Initializes a new instance of the DateTime to a specified number of ticks.
     * @param ticks A date and time expressed in the number of 100-nanosecond
     * intervals that have elapsed since January 1, 0001 at 00:00:00.000 in
     * the Gregorian calendar.
     */
    constructor(ticks: number);
    constructor(date: Date);
    /**
     * Initializes a new instance of the DateTime to the specified year, month, and day.
     * @param year The year (1 through 9999).
     * @param month The month (1 through 12).
     * @param day The day (1 through the number of days in month).
     */
    constructor(year: number, month: number, day: number);
    /**
     * Initializes a new instance of the DateTime to the
     * specified year, month, day, hour, minute, and second.
     * @param year The year (1 through 9999).
     * @param month The month (1 through 12).
     * @param day The day (1 through the number of days in month).
     * @param hour The hours (0 through 23).
     * @param minute The minutes (0 through 59).
     * @param second The seconds (0 through 59).
     */
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number);
    /**
     * Initializes a new instance of the DateTime to the
     * specified year, month, day, hour, minute, second, and millisecond.
     * @param year The year (1 through 9999).
     * @param month The month (1 through 12).
     * @param day The day (1 through the number of days in month).
     * @param hour The hours (0 through 23).
     * @param minute The minutes (0 through 59).
     * @param second The seconds (0 through 59).
     * @param millisecond The milliseconds (0 through 999).
     */
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number);
    /**
     * The ticks corresponding to the given year, month, and day.
     * Will check the if the parameters are valid
     * @param year The number of years
     * @param month The number of months
     * @param day The number of days
     */
    private static DateToTicks;
    private static TimeToTicks;
    /**
     * Whether a given year is a leap year
     * @param year A year to check
     */
    static IsLeapYear(year: number): boolean;
    /**
     * The number of days in the month
     * @param year The year of the month
     * @param month The month we want to know the days of.
     */
    static DaysInMonth(year: number, month: number): number;
    /**
     * Add the fractional number of time units to this DateTime
     * @param value The value to add to the DateTime. ie 1,2,3,4
     * @param scale The scale of the value. ie DateTime.MillisPerDay
     */
    private add;
    /**
     * Add the given number of 100-nanosecond ticks to this DateTime. The value argument
     * is permitted to be negative.
     * @param value the number of ticks to add.
     */
    addTicks(value: number): DateTime;
    /**
     * Adds a fractional number of
     * days to this DateTime. The result is computed by rounding the
     * fractional number of days given by value to the nearest
     * millisecond, and adding that interval to this DateTime. The
     * value argument is permitted to be negative.
     * @param value The number of days to add.
     */
    addDays(value: number): DateTime;
    /**
     * Add a fractional number of hours to this DateTime.
     * The result is computed by rounding the
     * fractional number of hours given by value to the nearest
     * millisecond, and adding that interval to this DateTime. The
     * value argument is permitted to be negative.
     * @param value The number of hours to add.
     */
    addHours(value: number): DateTime;
    /**
     * Add a given number of milliseconds to this DateTime.
     * The result is computed by rounding the number of milliseconds
     * given by value to the nearest integer, and adding that interval
     * to this DateTime. The value argument is permitted to be negative.
     * @param value The number of milliseconds to add.
     */
    addMilliseconds(value: number): DateTime;
    /**
     * Add a fractional number of minutes to this DateTime.
     * The result is computed by rounding the
     * fractional number of minutes given by value to the nearest
     * millisecond, and adding that interval to this DateTime. The
     * value argument is permitted to be negative.
     * @param value The number of fractional minutes to add.
     */
    addMinutes(value: number): DateTime;
    /**
     * Adds a fractional number of seconds to this DateTime.
     * The result is computed by rounding the
     * fractional number of seconds given by value to the nearest
     * millisecond, and adding that interval to this DateTime. The
     * value argument is permitted to be negative.
     * @param value
     */
    addSeconds(value: number): DateTime;
    /**
     * Adds the given number of months to this DateTime.
     * The result is computed by incrementing
     * (or decrementing) the year and month parts of this DateTime by
     * months, and, if required, adjusting the day part of the
     * resulting date downwards to the last day of the resulting month in the
     * resulting year. The time-of-day part of the result is the same as the
     * time-of-day part of this DateTime.
     *
     * In more precise terms, considering this DateTime to be of the
     * form y / m / d + t, where y is the
     * year, m is the month, d is the day, and t is the
     * time-of-day, the result is y1 / m1 / d1 + t,
     * where y1 and m1 are computed by adding months months
     * to y and m, and d1 is the largest value less than
     * or equal to d that denotes a valid day in month m1 of year
     * y1.
     *
     * @param months The number of months to add.
     */
    addMonths(months: number): DateTime;
    /**
     * Add the given number of years to this DateTime.
     * The result is computed by incrementing
     * (or decrementing) the year part of this DateTime by value
     * years. If the month and day of this DateTime is 2/29, and if the
     * resulting year is not a leap year, the month and day of the resulting
     * DateTime becomes 2/28. Otherwise, the month, day, and time-of-day
     * parts of the result are the same as those of this DateTime.
     * @param value The number of years to add.
     */
    addYears(value: number): DateTime;
    private getDatePart;
    private static GetDatePart;
    private getAllDatePart;
    /**
     * Checks whether a DateTime or Date is equal to current instance.
     * @param value The object to compare to this instance.
     * @return true if the value parameter equals the value of
     * this instance; otherwise, false.
     */
    equals(value: DateTime | Date): boolean;
    /**
     * Compares two DateTimes.
     * @param value The DateTime to compare to the current instance.
     * @returns A signed number indicating the relative values of this
     * instance and the value parameter.
     * | Value | Description                         |
     * | -1    | This instance is earlier than value |
     * |  0    | This instance is same as value      |
     * |  1    | This instance is greater than value |
     */
    compareTo(value: DateTime): number;
    /**
     * Subtracts two DateTimes.
     * @param value The date and time value to subtract.
     * @returns A time interval that is equal to the date and time
     * represented by this instance minus the date and time of the value.
     */
    subtract(value: DateTime): TimeSpan;
    /**
     * Subtracts the specified duration from this instance
     * @param value The time interval to subtract.
     * @returns An object that is equal to the date and time
     * represented by this instance minus the time interval represented by
     */
    subtractTime(value: TimeSpan): DateTime;
    private static formatChars;
    private weekdayName;
    private monthName;
    private string;
    /**
     * Turns DateTime into a string with the specified format.
     *
     * | Patterns        | Format  | Description                                     | Example |
     * | --------------- | ------- | ------------------------------------------------| ------- |
     * | h               | 0       | 12 hour w/o leading zero                        | 3       |
     * | hh              | 00      | 12 hour with leading zero                       | 03      |
     * | hh*             | 00      | 12 hour with leading zero                       | 03      |
     * | H               | 0       | 24 hour w/o leading zero                        | 8       |
     * | HH              | 00      | 24 hour with leading zero                       | 08      |
     * | HH*             | 00      | 24 hour with leading zero                       | 08      |
     * | m               | 0       | minute  w/o leading zero                        | 1       |
     * | mm              | 00      | minute  with leading zero                       | 01      |
     * | mm*             | 00      | minute  with leading zero                       | 01      |
     * | s               | 0       | second  w/o leading zero                        | 5       |
     * | ss              | 00      | second  with leading zero                       | 05      |
     * | ss*             | 00      | second  with leading zero                       | 05      |
     * | t               | -       | first character of AM/PM designator             | A/P     |
     * | tt              | -       | AM/PM designator                                | AM/PM   |
     * | tt*             | -       | AM/PM designator                                | AM/PM   |
     * | d               | 0       | day w/o leading zero                            | 1       |
     * | dd              | 00      | day with leading zero                           | 01      |
     * | ddd             | -       | short weekday name (abbreviation)               | Mon     |
     * | dddd            | -       | full weekday name                               | Monday  |
     * | dddd*           | -       | full weekday name                               | Monday  |
     * | M               | 0       | month w/o leading zero                          | 2       |
     * | MM              | 00      | month with leading zero                         | 02      |
     * | MMM             | -       | short month name (abbreviation)                 | Feb     |
     * | MMMM            | -       | full month name                                 | February|
     * | MMMM*           | -       | full month name                                 | February|
     * | y               | 0       | two digit year (year % 100) w/o leading zero    | 1       |
     * | yy              | 00      | two digit year (year % 100) with leading zero   | 01      |
     * | yyyy            | 0000    | full year                                       | 2019    |
     * | yyyy*           | 0000    | full year                                       | 2019    |
     * | '...'           | -       | quoted string, ignore matching values           | 'ABC'   |
     *
     *
     * @param format The format you would like the string in
     */
    toString(format?: string): string;
    /**
     * DateTime as Javascript Date
     * @returns A Javascript Date object that represent this DateTime instance.
     */
    toDate(): Date;
    /**
     * @hidden
     */
    [Symbol.toPrimitive](hint: string): string | number;
}
