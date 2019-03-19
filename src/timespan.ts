import DateTime from "./datetime";

export enum TimeSpanComponent {
    hours = 1, minutes = 2, second = 4, milliseconds = 8
}

export default class TimeSpan {
    public hours: number
    public minutes: number
    public seconds: number
    public milliseconds: number

    constructor(date: Date)
    constructor(hours?: number, minutes?: number, seconds?: number, milliseconds?: number)
    constructor(
        hours?: number | Date,
        minutes?: number,
        seconds?: number,
        milliseconds?: number) {
        if (hours instanceof Date) {
            const date = hours
            this.hours = date.getHours()
            this.minutes = date.getMinutes()
            this.seconds = date.getSeconds()
            this.milliseconds = date.getMilliseconds()
        } else {
            this.hours = hours || 0
            this.minutes = minutes || 0
            this.seconds = seconds || 0
            this.milliseconds = milliseconds || 0
        }
    }

    private equality(timespan: TimeSpan, check?: TimeSpanComponent) {
        switch (check) {
            case null:
            case undefined:
                return false
            case this.hours:
                return this.hours == timespan.hours
            case this.minutes:
                return this.minutes == timespan.minutes
            case this.seconds:
                return this.seconds == timespan.seconds
            case this.milliseconds:
                return this.milliseconds == timespan.milliseconds
        }
    }

    public equals(value: Date | TimeSpan | DateTime, check?: TimeSpanComponent) {
        let timespan = new TimeSpan();
        if (value instanceof TimeSpan) {
            timespan = value
        } else if (value instanceof Date) {
            timespan = new TimeSpan(value)
        } else if (value instanceof DateTime) {
            timespan = value.time
        }
        return this.equality(timespan, check)
    }
}