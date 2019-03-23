import TimeSpan from "./timespan";

export enum DateTimeComponent {
    year, month, date
}

export enum DayOfWeek {
    Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
}

export enum DateTimeKind {
    Unspecified, Utc, Local
}

export interface IDateTime {
    addTicks(value: number): DateTime
    addDays(value: number): DateTime
    addHours(value: number): DateTime
    addMilliseconds(value: number): DateTime
    addMinutes(value: number): DateTime
    addMonths(value: number): DateTime
    addSeconds(value: number): DateTime
    addYears(value: number): DateTime

    equals(value: DateTime): boolean
    compareTo(value: DateTime): number
}

interface IDatePart {
    year: number
    month: number
    day: number
}

export default class DateTime {
    // The data is stored as an unsigned 64-bit integeter
    //   Bits 01-62: The value of 100-nanosecond ticks where 0 represents 1/1/0001 12:00am, up until the value
    //               12/31/9999 23:59:59.9999999
    //   Bits 63-64: A four-state value that describes the DateTimeKind value of the date time, with a 2nd
    //               value for the rare case where the date time is local, but is in an overlapped daylight
    //               savings time hour and it is in daylight savings time. This allows distinction of these
    //               otherwise ambiguous local times and prevents data loss when round tripping from Local to
    //               UTC time.
    private dateData: number;

    // Number of 100ns ticks per time unit
    private static readonly TicksPerMillisecond = 10000;
    private static readonly TicksPerSecond = DateTime.TicksPerMillisecond * 1000;
    private static readonly TicksPerMinute = DateTime.TicksPerSecond * 60;
    private static readonly TicksPerHour = DateTime.TicksPerMinute * 60;
    private static readonly TicksPerDay = DateTime.TicksPerHour * 24;

    // Number of milliseconds per time unit
    private static readonly MillisPerSecond = 1000;
    private static readonly MillisPerMinute = DateTime.MillisPerSecond * 60;
    private static readonly MillisPerHour = DateTime.MillisPerMinute * 60;
    private static readonly MillisPerDay = DateTime.MillisPerHour * 24;

    // Number of days in a non-leap year
    private static readonly DaysPerYear = 365;
    // Number of days in 4 years
    private static readonly DaysPer4Years = DateTime.DaysPerYear * 4 + 1;       // 1461
    // Number of days in 100 years
    private static readonly DaysPer100Years = DateTime.DaysPer4Years * 25 - 1;  // 36524
    // Number of days in 400 years
    private static readonly DaysPer400Years = DateTime.DaysPer100Years * 4 + 1; // 146097

    // Number of days from 1/1/0001 to 12/31/1600
    private static readonly DaysTo1601 = DateTime.DaysPer400Years * 4;          // 584388
    // Number of days from 1/1/0001 to 12/30/1899
    private static readonly DaysTo1899 = DateTime.DaysPer400Years * 4 + DateTime.DaysPer100Years * 3 - 367;
    // Number of days from 1/1/0001 to 12/31/1969
    private static readonly DaysTo1970 = DateTime.DaysPer400Years * 4 + DateTime.DaysPer100Years * 3 + DateTime.DaysPer4Years * 17 + DateTime.DaysPerYear; // 719,162
    // Number of days from 1/1/0001 to 12/31/9999
    private static readonly DaysTo10000 = DateTime.DaysPer400Years * 25 - 366;  // 3652059

    private static readonly MinTicks = 0;
    private static readonly MaxTicks = DateTime.DaysTo10000 * DateTime.TicksPerDay - 1;
    private static readonly MaxMillis = DateTime.DaysTo10000 * DateTime.MillisPerDay;

    private static readonly DatePartYear = 0;
    private static readonly DatePartDayOfYear = 1;
    private static readonly DatePartMonth = 2;
    private static readonly DatePartDay = 3;

    private static DaysToMonth365 = [
        0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    private static DaysToMonth366 = [
        0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

    private get internalTicks(): number {
        return this.dateData;
    }

    /**
     * The year part of this DateTime. The value is between 1 and 9999.
     */
    public get year(): number {
        return this.getDatePart(DateTime.DatePartYear);
    }

    /**
     * The month part of this DateTime. The value is an integer between 1 and 12.
     */
    public get month(): number {
        return this.getDatePart(DateTime.DatePartMonth);
    }

    /**
     * The day-of-month part of this DateTime. The value is between 1 and 31.
     */
    public get day(): number {
        return this.getDatePart(DateTime.DatePartDay);
    }

    /**
     * The day-of-year part of this DateTime. The value is between 1 and 366.
     */
    public get dayOfYear(): number {
        return this.getDatePart(DateTime.DatePartDayOfYear);
    }

    /**
     * The day-of-week part of this DateTime. The returned value
     * is an integer between 0 and 6, where 0 indicates Sunday, 1 indicates
     * Monday, 2 indicates Tuesday, 3 indicates Wednesday, 4 indicates
     * Thursday, 5 indicates Friday, and 6 indicates Saturday.
     */
    public get dayOfWeek(): DayOfWeek {
        return <DayOfWeek>(Math.floor(this.internalTicks / DateTime.TicksPerDay + 1) % 7);
    }

    /**
     * The hour part of this DateTime. The value is between 0 and 23.
     */
    public get hour(): number {
        return (Math.floor(this.internalTicks / DateTime.TicksPerHour) % 24);
    }

    /**
     * The minute part of this DateTime. The value is between 0 and 59.
     */
    public get minute(): number {
        return (Math.floor(this.internalTicks / DateTime.TicksPerMinute) % 60);
    }

    /**
     * The second part of this DateTime. The value is between 0 and 59.
     */
    public get second(): number {
        return (Math.floor(this.internalTicks / DateTime.TicksPerSecond) % 60);
    }

    /**
     * The millisecond part of this DateTime. The value is between 0 and 999.
     */
    public get millisecond(): number {
        return (Math.floor(this.internalTicks / DateTime.TicksPerMillisecond) % 1000);
    }
    /**
     * Returns the tick count for this DateTime. The returned value is
     * the number of 100-nanosecond intervals that have elapsed since 1/1/0001
     * 12:00am.
     */
    public get ticks(): number {
        return this.internalTicks
    }

    public constructor(ticks: number)
    public constructor(date: Date)
    public constructor(year: number, month: number, day: number)
    public constructor(year: number, month: number, day: number, hour: number, minute: number, second: number)
    public constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number)
    public constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, kind: DateTimeKind)
    constructor(year: number | Date, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number, kind: DateTimeKind = DateTimeKind.Unspecified) {
        let ticks = 0
        if (typeof year === 'number') {
            if (month && day) {
                ticks = DateTime.DateToTicks(year, month, day);
            } else {
                ticks = year
            }
        } else {
            const date = year;
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            hour = date.getHours()
            minute = date.getMinutes()
            second = date.getSeconds()
            ticks = DateTime.DateToTicks(year, month, day);
        }

        if (hour != null && minute != null && second != null) {
            ticks += DateTime.TimeToTicks(hour, minute, second)
        }

        if (millisecond) {
            ticks += millisecond * DateTime.TicksPerMillisecond;
            if (ticks < DateTime.MinTicks || ticks > DateTime.MaxTicks)
                throw 'Out of DateTime Range'
        }
        this.dateData = (ticks);
    }

    /**
     * The ticks corresponding to the given year, month, and day.
     * Will check the if the parameters are valid
     * @param year The number of years
     * @param month The number of months
     * @param day The number of days
     */
    private static DateToTicks(year: number, month: number, day: number): number {
        if (year >= 1 && year <= 9999 && month >= 1 && month <= 12) {
            const days = DateTime.IsLeapYear(year) ? DateTime.DaysToMonth366 : DateTime.DaysToMonth365;
            if (day >= 1 && day <= days[month] - days[month - 1]) {
                const y = year - 1;
                let n = y * 365 + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + days[month - 1] + day - 1;
                let ticks = n * DateTime.TicksPerDay
                return ticks;
            }
        }
        throw 'Argument Out of range (Year 1-9999 and Month 1-12';
    }

    // Return the tick count corresponding to the given hour, minute, second.
    // Will check the if the parameters are valid.
    private static TimeToTicks(hour: number, minute: number, second: number): number {
        //TimeSpan.TimeToTicks is a family access function which does no error checking, so
        //we need to put some error checking out here.
        if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && second >= 0 && second < 60) {
            return (TimeSpan.TimeToTicks(hour, minute, second));
        }
        throw 'Argument Out of range (BadHourMinuteSecond)'
    }

    /**
     * Whether a given year is a leap year
     * @param year A year to check
     */
    public static IsLeapYear(year: number): boolean {
        if (year < 1 || year > 9999) {
            throw 'Year is out of range'
        }
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    /**
     * The number of days in the month
     * @param year The year of the month
     * @param month The month we want to know the days of.
     */
    public static DaysInMonth(year: number, month: number): number {
        if (month < 1 || month > 12) throw 'Month Out of range 1 - 12'
        // IsLeapYear checks the year argument
        const days = DateTime.IsLeapYear(year) ? DateTime.DaysToMonth366 : DateTime.DaysToMonth365;
        return days[month] - days[month - 1];
    }

    /**
     * Add the fractional number of time units to this DateTime
     * @param value The value to add to the DateTime. ie 1,2,3,4
     * @param scale The scale of the value. ie DateTime.MillisPerDay
     */
    private add(value: number, scale: number): DateTime {
        let millis = (value * scale + (value >= 0 ? 0.5 : -0.5));
        if (millis <= -DateTime.MaxMillis || millis >= DateTime.MaxMillis)
            throw 'Out of Range '
        return this.addTicks(millis * DateTime.TicksPerMillisecond);
    }

    /**
     * Add the given number of 100-nanosecond ticks to this DateTime. The value argument
     * is permitted to be negative.
     * @param value the number of ticks to add.
     */
    public addTicks(value: number): DateTime {
        let ticks = this.internalTicks;
        if (value > DateTime.MaxTicks - ticks || value < DateTime.MinTicks - ticks) {
            throw 'New DateTime Out of Range'
            // throw new ArgumentOutOfRangeException('value', Environment.GetResourceString('ArgumentOutOfRange_DateArithmetic'));
        }
        return new DateTime((ticks + value));
    }

    /**
     * Adds a fractional number of
     * days to this DateTime. The result is computed by rounding the
     * fractional number of days given by value to the nearest
     * millisecond, and adding that interval to this DateTime. The
     * value argument is permitted to be negative.
     * @param value The number of days to add.
     */
    public addDays(value: number): DateTime {
        return this.add(value, DateTime.MillisPerDay);
    }

    /**
     * Add a fractional number of hours to this DateTime. 
     * The result is computed by rounding the
     * fractional number of hours given by value to the nearest
     * millisecond, and adding that interval to this DateTime. The
     * value argument is permitted to be negative.
     * @param value The number of hours to add.
     */
    public addHours(value: number): DateTime {
        return this.add(value, DateTime.MillisPerHour);
    }

    /**
     * Add a given number of milliseconds to this DateTime. 
     * The result is computed by rounding the number of milliseconds 
     * given by value to the nearest integer, and adding that interval 
     * to this DateTime. The value argument is permitted to be negative.
     * @param value The number of milliseconds to add.
     */
    public addMilliseconds(value: number): DateTime {
        return this.add(value, 1);
    }

    /**
     * Add a fractional number of minutes to this DateTime. 
     * The result is computed by rounding the
     * fractional number of minutes given by value to the nearest
     * millisecond, and adding that interval to this DateTime. The
     * value argument is permitted to be negative.
     * @param value The number of fractional minutes to add.
     */
    public addMinutes(value: number): DateTime {
        return this.add(value, DateTime.MillisPerMinute);
    }

    /**
     * Adds a fractional number of seconds to this DateTime. 
     * The result is computed by rounding the
     * fractional number of seconds given by value to the nearest
     * millisecond, and adding that interval to this DateTime. The
     * value argument is permitted to be negative.
     * @param value 
     */
    public addSeconds(value: number): DateTime {
        return this.add(value, DateTime.MillisPerSecond);
    }

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
    public addMonths(months: number): DateTime {
        if (months < -120000 || months > 120000)
            throw 'Months - Out of Range'

        let y: number, m: number, d: number;
        const datePart = this.getAllDatePart()
        y = datePart.year
        m = datePart.month
        d = datePart.day

        const i = m - 1 + months;
        if (i >= 0) {
            m = i % 12 + 1;
            y = y + i / 12;
        }
        else {
            m = 12 + (i + 1) % 12;
            y = y + (i - 11) / 12;
        }
        if (y < 1 || y > 9999) {
            throw 'New DateTime Out of Range'
        }
        const days = DateTime.DaysInMonth(y, m);
        if (d > days) d = days;
        return new DateTime(DateTime.DateToTicks(y, m, d + this.internalTicks % DateTime.TicksPerDay));
    }

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
    public addYears(value: number): DateTime {
        if (value < -10000 || value > 10000) throw 'Years Out of Range'
        return this.addMonths(value * 12);
    }

    private getDatePart(part: number) {
        return DateTime.GetDatePart(part, this.internalTicks);
    }

    // Returns a given date part of this DateTime. This method is used
    // to compute the year, day-of-year, month, or day part.
    private static GetDatePart(part: number, ticks: number): number {
        // let ticks = this.internalTicks;
        // n = number of days since 1/1/0001
        let n = Math.floor(ticks / DateTime.TicksPerDay);
        // y400 = number of whole 400-year periods since 1/1/0001
        let y400 = Math.floor(n / DateTime.DaysPer400Years);
        // n = day number within 400-year period
        n -= y400 * DateTime.DaysPer400Years;
        // y100 = number of whole 100-year periods within 400-year period
        let y100 = Math.floor(n / DateTime.DaysPer100Years);
        // Last 100-year period has an extra day, so decrement result if 4
        if (y100 == 4) y100 = 3;
        // n = day number within 100-year period
        n -= y100 * DateTime.DaysPer100Years;
        // y4 = number of whole 4-year periods within 100-year period
        let y4 = Math.floor(n / DateTime.DaysPer4Years);
        // n = day number within 4-year period
        n -= y4 * DateTime.DaysPer4Years;
        // y1 = number of whole years within 4-year period
        let y1 = Math.floor(n / DateTime.DaysPerYear);
        // Last year has an extra day, so decrement result if 4
        if (y1 == 4) y1 = 3;
        // If year was requested, compute and return it
        if (part == DateTime.DatePartYear) {
            return y400 * 400 + y100 * 100 + y4 * 4 + y1 + 1;
        }
        // n = day number within year
        n -= y1 * DateTime.DaysPerYear;
        // If day-of-year was requested, return it
        if (part == DateTime.DatePartDayOfYear) return n + 1;
        // Leap year calculation looks different from IsLeapYear since y1, y4,
        // and y100 are relative to year 1, not year 0
        let leapYear = y1 == 3 && (y4 != 24 || y100 == 3);
        let days = leapYear ? DateTime.DaysToMonth366 : DateTime.DaysToMonth365;
        // All months have less than 32 days, so n >> 5 is a good conservative
        // estimate for the month
        let m = n >> 5 + 1;
        // m = 1-based month number
        while (n >= days[m]) m++;
        // If month was requested, return it
        if (part == DateTime.DatePartMonth) return m;
        // Return 1-based day-of-month
        return n - days[m - 1] + 1;
    }

    // Exactly the same as GetDatePart(int part), except computing all of
    // year/month/day rather than just one of them.  Used when all three
    // are needed rather than redoing the computations for each.
    private getAllDatePart(): IDatePart {
        let ticks = this.internalTicks;
        // n = number of days since 1/1/0001
        let n = Math.floor(ticks / DateTime.TicksPerDay);
        // y400 = number of whole 400-year periods since 1/1/0001
        let y400 = Math.floor(n / DateTime.DaysPer400Years);
        // n = day number within 400-year period
        n -= Math.floor(y400 * DateTime.DaysPer400Years);
        // y100 = number of whole 100-year periods within 400-year period
        let y100 = Math.floor(n / DateTime.DaysPer100Years);
        // Last 100-year period has an extra day, so decrement result if 4
        if (y100 == 4) y100 = 3;
        // n = day number within 100-year period
        n -= Math.floor(y100 * DateTime.DaysPer100Years);
        // y4 = number of whole 4-year periods within 100-year period
        let y4 = Math.floor(n / DateTime.DaysPer4Years);
        // n = day number within 4-year period
        n -= Math.floor(y4 * DateTime.DaysPer4Years);
        // y1 = number of whole years within 4-year period
        let y1 = Math.floor(n / DateTime.DaysPerYear);
        // Last year has an extra day, so decrement result if 4
        if (y1 == 4) y1 = 3;
        // compute year
        let year = Math.floor(y400 * 400 + y100 * 100 + y4 * 4 + y1 + 1);
        // n = day number within year
        n -= Math.floor(y1 * DateTime.DaysPerYear);
        // dayOfYear = n + 1;
        // Leap year calculation looks different from IsLeapYear since y1, y4,
        // and y100 are relative to year 1, not year 0
        let leapYear = y1 == 3 && (y4 != 24 || y100 == 3);
        let days = leapYear ? DateTime.DaysToMonth366 : DateTime.DaysToMonth365;
        // All months have less than 32 days, so n >> 5 is a good conservative
        // estimate for the month
        let m = (n >> 5) + 1;
        // m = 1-based month number
        while (n >= days[m]) m++;
        // compute month and day
        let month = m;
        let day = n - days[m - 1] + 1;
        return { year, month, day }
    }

    public equals(value: DateTime | Date): boolean {
        if (value instanceof Date) {
            value = new DateTime(value);
        }
        return this.internalTicks == value.internalTicks;
    }

    public compareTo(value: DateTime): number {
        const valueTicks = value.internalTicks;
        const ticks = this.internalTicks;
        if (ticks > valueTicks) return 1;
        if (ticks < valueTicks) return -1;
        return 0;
    }

    public subtract(value: DateTime): TimeSpan {
        return new TimeSpan(this.internalTicks - value.internalTicks);
    }

    public subtractTime(value: TimeSpan): DateTime {
        const ticks = this.internalTicks;
        const valueTicks = value.ticks;
        if (ticks - DateTime.MinTicks < valueTicks || ticks - DateTime.MaxTicks > valueTicks) {
            throw 'DateTime out of range'
        }
        return new DateTime((ticks - valueTicks));
    }

    private pad(num: number, size?: number): string {
        var s = String(num);
        while (s.length < (size || 2)) { s = '0' + s; }
        return s;
    }

    private static formatChars = ['h', 'H', 'M', 'm', 't', 's', 'y', 'd', '*']

    private weekdayName(day: DayOfWeek, abbrev: boolean = false): string {
        switch (day) {
            case DayOfWeek.Monday:
                return abbrev ? 'Mon' : 'Monday'
            case DayOfWeek.Tuesday:
                return abbrev ? 'Tue' : 'Tuesday'
            case DayOfWeek.Wednesday:
                return abbrev ? 'Wed' : 'Wednesday'
            case DayOfWeek.Thursday:
                return abbrev ? 'Thu' : 'Thursday'
            case DayOfWeek.Friday:
                return abbrev ? 'Fri' : 'Friday'
            case DayOfWeek.Saturday:
                return abbrev ? 'Sat' : 'Saturday'
            case DayOfWeek.Sunday:
                return abbrev ? 'Sun' : 'Sunday'
        }
    }

    private monthName(month: number, abbrev: boolean = false): string {
        switch (month) {
            case 1:
                return abbrev ? 'Jan' : 'January'
            case 2:
                return abbrev ? 'Feb' : 'February'
            case 3:
                return abbrev ? 'Mar' : 'March'
            case 4:
                return abbrev ? 'Apr' : 'April'
            case 5:
                return abbrev ? 'May' : 'May'
            case 6:
                return abbrev ? 'Jun' : 'June'
            case 7:
                return abbrev ? 'Jul' : 'July'
            case 8:
                return abbrev ? 'Aug' : 'August'
            case 9:
                return abbrev ? 'Sep' : 'September'
            case 10:
                return abbrev ? 'Oct' : 'October'
            case 11:
                return abbrev ? 'Nov' : 'November'
            case 12:
                return abbrev ? 'Dec' : 'December'
        }
        return ''
    }

    private string(format: string): string {
        const hour24 = this.hour
        const hour12 = hour24 % 12

        let designator = 'AM'
        if (hour24 >= 12) {
            designator = 'PM'
        }
        const minute = this.minute
        const second = this.second
        const year = this.year
        const month = this.month
        const day = this.day
        const dayOfWeek = this.dayOfWeek
        switch (format) {
            case 'HH*':
            case 'HH':
            case 'hh*':
            case 'hh':
                return this.pad(hour12)
            case 'H':
            case 'h':
                return String(hour24)
            case 'tt*':
            case 'tt':
                return designator
            case 't':
                return designator[0]
            case 'MMMM*':
            case 'MMMM':
                return this.monthName(month)
            case 'MMM':
                return this.monthName(month, true)
            case 'MM':
                return this.pad(month)
            case 'M':
                return  String(month)
            case 'dddd*':
            case 'dddd':
                return this.weekdayName(dayOfWeek)
            case 'ddd':
                return this.weekdayName(dayOfWeek, true)
            case 'dd':
                return this.pad(day)
            case 'd':
                return String(day)
            case 'mm*':
            case 'mm':
                return this.pad(minute)
            case 'm':
                return String(minute);
            case 'ss*':
            case 'ss':
                return this.pad(second);
            case 's':
                return String(second);
            default:
                if (format.indexOf('y') != -1) {
                    return this.pad(year, format.length);
                }
                return '';
        }
    }

    /**
     * Turns DateTime into a string with in the specified format.
     * 
     * Patterns   Format   Description                                     Example
     * ========== =======  ==========================                      =========
     *  "h"       "0"      12 hour w/o leading zero                        3
     *  "hh"      "00"     12 hour with leading zero                       03
     *  "hh*"     "00"     12 hour with leading zero                       03
     *                     
     *  "H"       "0"      24 hour w/o leading zero                        8
     *  "HH"      "00"     24 hour with leading zero                       08
     *  "HH*"     "00"     24 hour with leading zero                       08
     *                     
     *  "m"       "0"      minute w/o leading zero                         1
     *  "mm"      "00"     minute with leading zero                        01
     *  "mm*"     "00"     minute with leading zero                        01
     *                     
     *  "s"       "0"      second w/o leading zero                         1
     *  "ss"      "00"     second with leading zero                        01
     *  "ss*"     "00"     second with leading zero                        01
     *            
     *  "t"       "0"      first character of AM/PM designator             1
     *  "tt"      "00"     AM/PM designator                                01
     *  "tt*"     "00"     AM/PM designator                                01
     *            
     *  "d"       "0"      day w/o leading zero                            1
     *  "dd"      "00"     day with leading zero                           01
     *  "ddd"              short weekday name (abbreviation)               Mon
     *  "dddd"             full weekday name                               Monday
     *  "dddd*"            full weekday name                               Monday
     *            
     *  "M"       "0"      month w/o leading zero                          2
     *  "MM"      "00"     month with leading zero                         02
     *  "MMM"              short month name (abbreviation)                 Feb
     *  "MMMM"             full month name                                 Febuary
     *  "MMMM*"            full month name                                 Febuary
     * 
     *  "y"       "0"      two digit year (year % 100) w/o leading zero    1
     *  "yy"      "00"     two digit year (year % 100) with leading zero   01
     *  "yyyy"    "00"     full year                                       2000
     *  "yyyy*"   "00"     full year                                       2000
     * 
     *  "'"                quoted string                                   'ABC' will insert ABC into the formatted string.
     * 
     * @param format The format you would like the string in
     */
    toString(format: string = 'yyyy-MM-ddTHH:mm:ss'): string {
        let final = ''
        let current = ''
        while (format.length > 0) {
            current += format.slice(0, 1)
            const next = format.slice(1, 2)
            if(current == "'") {
                const endQuotePos = format.indexOf("'",2);
                final += format.slice(1,endQuotePos)
                format = format.slice(endQuotePos+1)
                current =''
                continue;
            }
            if (DateTime.formatChars.filter(f => current.indexOf(f) != -1).length == 0) {
                final += current
                current = ''
                format = format.slice(1)
                continue;
            }
            if (DateTime.formatChars.filter(f => current.indexOf(f) != -1).length > 0 &&
                DateTime.formatChars.filter(f => f == next).length == 0) {
                // console.log('Found-------------', current);
                final += this.string(current);
                current = ''
            }
            format = format.slice(1)
        }
        return final;

    }

    [Symbol.toPrimitive](hint: string): string | number {
        if (hint == 'string') {
            return '';
        }
        return this.ticks;
    }
}