import TimeSpan from "./timespan";

export enum DateTimeComponent {
    year, month, date
}

export default class DateTime {
    public jsDate: Date
    public time: TimeSpan

    get year(): number {
        return this.jsDate.getFullYear();
    }

    set year(newYear: number) {
        this.jsDate.setFullYear(newYear);
    }

    get month(): number {
        return this.jsDate.getMonth()
    }

    set month(newMonth: number) {
        this.jsDate.setMonth(newMonth)
    }

    get date(): number {
        return this.jsDate.getDate()
    }

    set date(newDate: number) {
        this.jsDate.setDate(newDate)
    }


    /**
     * Create a DateTime from the current date and time according to system settings for timezone offset.
     */
    public constructor()
    /**
     * Create a DateTime from js Date.
     * @param date The date you want to replicate
     */
    public constructor(date: Date)
    /**
     * Create a DateTime from elapsed milliseconds since January 1, 1970
     * @param milliseconds Milliseconds elapsed since January 1, 1970 
     */
    public constructor(milliseconds: number)
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
    public constructor(year: number, month: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number)
    public constructor(year?: number | Date,
        month?: number,
        day?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        milliseconds?: number) {
        if (typeof year === 'undefined' || year === null) {
            this.jsDate = new Date();
        } else if (year instanceof Date) {
            this.jsDate = year;
        } else {
            if (typeof month === 'undefined' || month == null) {
                this.jsDate = new Date(year)
            } else {
                const monthIndex = month - 1;
                this.jsDate = new Date(year, monthIndex, day || 0, hours || 0, minutes || 0, seconds || 0, milliseconds || 0)
            }
        }
        this.time = new TimeSpan(this.jsDate);
    }

    private equality(date: Date, check?: DateTimeComponent, fullCheck: boolean = true): boolean {
        switch (check) {
            case DateTimeComponent.year:
                return date.getFullYear() == this.year
            case DateTimeComponent.month:
                return (fullCheck || this.equality(date, DateTimeComponent.year)) &&
                    date.getMonth() == this.month
            case DateTimeComponent.date:
                return (fullCheck || this.equality(date, DateTimeComponent.month)) &&
                    date.getDate() == this.date
            case null:
            case undefined:
                return date.getTime() == this.jsDate.getTime()
        }
    }

    public equals(date: Date | DateTime | number, check?: DateTimeComponent, fullCheck: boolean = true): boolean {
        if (date instanceof Date || date instanceof DateTime) {
            if (date instanceof DateTime) {
                date = date.jsDate
            }
            return this.equality(date, check, fullCheck)
        } else {
            return date == this.jsDate.valueOf();
        }
    }

    public addDays(days: number): DateTime {
        var date = new Date(this.jsDate);
        date.setDate(date.getDate() + days);
        return new DateTime(date);
    }

    public substractDays(days: number): DateTime {
        return this.addDays(-days);
    }

    public daysBetween(date: Date | DateTime): number {
        if (date instanceof DateTime) {
            date = date.jsDate
        }
        return (Math.abs(date.getTime() - this.jsDate.getTime()) / 1000) / 60 / 1440
    }

    [Symbol.toPrimitive](hint: string): string | number {
        return this.jsDate.valueOf();
    }
}