/**
 * @module TimeSpan
 */

/**
 * Represents a time interval.
 */
export default class TimeSpan {
    public static readonly TicksPerMillisecond = 10000;
    private static readonly MillisecondsPerTick = 1.0 / TimeSpan.TicksPerMillisecond;

    public static readonly TicksPerSecond = TimeSpan.TicksPerMillisecond * 1000;   // 10,000,000
    private static readonly SecondsPerTick = 1.0 / TimeSpan.TicksPerSecond;        // 0.0001

    public static readonly TicksPerMinute = TimeSpan.TicksPerSecond * 60;          // 600,000,000
    private static readonly MinutesPerTick = 1.0 / TimeSpan.TicksPerMinute;        // 1.6666666666667e-9

    public static readonly TicksPerHour = TimeSpan.TicksPerMinute * 60;            // 36,000,000,000
    private static readonly HoursPerTick = 1.0 / TimeSpan.TicksPerHour;            // 2.77777777777777778e-11

    public static readonly TicksPerDay = TimeSpan.TicksPerHour * 24;               // 864,000,000,000
    private static readonly DaysPerTick = 1.0 / TimeSpan.TicksPerDay;              // 1.1574074074074074074e-12

    private static readonly MillisPerSecond = 1000;
    private static readonly MillisPerMinute = TimeSpan.MillisPerSecond * 60;       //     60,000
    private static readonly MillisPerHour = TimeSpan.MillisPerMinute * 60;         //  3,600,000
    private static readonly MillisPerDay = TimeSpan.MillisPerHour * 24;            // 86,400,000

    static readonly MaxSeconds = Number.MAX_SAFE_INTEGER / TimeSpan.TicksPerSecond;
    static readonly MinSeconds = Number.MIN_SAFE_INTEGER / TimeSpan.TicksPerSecond;

    static readonly MaxMilliSeconds = Number.MAX_VALUE / TimeSpan.TicksPerMillisecond;
    static readonly MinMilliSeconds = Number.MIN_VALUE / TimeSpan.TicksPerMillisecond;

    static readonly TicksPerTenthSecond = TimeSpan.TicksPerMillisecond * 100;

    public static readonly Zero: TimeSpan = new TimeSpan(0);

    public static readonly MaxValue: TimeSpan = new TimeSpan(Number.MAX_VALUE);
    public static readonly MinValue: TimeSpan = new TimeSpan(Number.MIN_VALUE);

    // internal so that DateTime doesn't have to call an extra get
    // method for some arithmetic operations.
    private _ticks: number;

    /**
     * Gets the number of ticks that represent the value of 
     * he current TimeSpan.
     */
    get ticks(): number {
        return this._ticks
    }

    /**
     * Gets the days component of the time interval represented 
     * by the current TimeSpan structure.
     */
    get days() {
        return Math.floor(this._ticks / TimeSpan.TicksPerDay)
    }

    /**
     * Gets the hours component of the time interval represented 
     * by the current TimeSpan structure.
     */
    get hours() {
        return Math.floor(this._ticks / TimeSpan.TicksPerHour) % 24
    }

    /**
     * Gets the minutes component of the time interval represented 
     * by the current TimeSpan structure.
     */
    get minutes() {
        return Math.floor(this._ticks / TimeSpan.TicksPerMinute) % 60
    }

    /**
     * Gets the seconds component of the time interval represented 
     * by the current TimeSpan structure.
     */
    get seconds() {
        return Math.floor(this._ticks / TimeSpan.TicksPerSecond) % 60
    }

    /**
     * Gets the milliseconds component of the time interval represented 
     * by the current TimeSpan structure.
     */
    get milliseconds() {
        return Math.floor(this._ticks / TimeSpan.TicksPerMillisecond) % 1000
    }

    /**
     * Gets the value of the current TimeSpan structure expressed 
     * in whole and fractional days.
     */
    get totalDays() {
        return this._ticks * TimeSpan.DaysPerTick
    }

    /**
     * Gets the value of the current TimeSpan structure expressed 
     * in whole and fractional hours.
     */
    get totalHours() {
        return this._ticks * TimeSpan.HoursPerTick
    }

    /**
     * Gets the value of the current TimeSpan structure expressed 
     * in whole and fractional minutes.
     */
    get totalMinutes() {
        return this._ticks * TimeSpan.MinutesPerTick
    }

    /**
     * Gets the value of the current TimeSpan structure expressed 
     * in whole and fractional seconds.
     */
    get totalSeconds() {
        return this._ticks * TimeSpan.SecondsPerTick
    }

    /**
     * Gets the value of the current TimeSpan structure expressed 
     * in whole and fractional milliseconds
     */
    get totalMilliseconds() {
        const temp = this._ticks * TimeSpan.MillisecondsPerTick;
        if (temp > TimeSpan.MaxMilliSeconds)
            return TimeSpan.MaxMilliSeconds;

        if (temp < TimeSpan.MinMilliSeconds)
            return TimeSpan.MinMilliSeconds;

        return temp;
    }
    /**
     * Initializes a new instance of the TimeSpan to the specified number of ticks
     * @param ticks A time period expressed in 100-nanosecond units. 
     */
    constructor(ticks: number)
    /**
     * Initializes a new instance of the TimeSpan to a specified 
     * number of hours, minutes, and seconds.
     * @param hours Number of hours.
     * @param minutes Number of minutes.
     * @param seconds Number of seconds.
     */
    constructor(hours: number, minutes: number, seconds: number)
    /**
     * Initializes a new instance of the TimeSpan to a specified 
     * number of days, hours, minutes, and seconds.
     * @param days Number of days.
     * @param hours Number of hours.
     * @param minutes Number of minutes
     * @param seconds Number of seconds
     */
    constructor(days: number, hours: number, minutes: number, seconds: number)
    /**
     * Initializes a new instance of the TimeSpan
     *  to a specified number of days, hours, minutes, seconds, and milliseconds.
     * @param days Number of days.
     * @param hours Number of hours.
     * @param minutes Number of minutes
     * @param seconds Number of seconds 
     * @param milliseconds Number of milliseconds
     */
    constructor(days: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number) {
        if (hours) {
            const totalMilliSeconds = (days * 3600 * 24 + hours * 3600 + (minutes || 0) * 60 + (seconds || 0)) * 1000 + (milliseconds || 0);
            if (totalMilliSeconds > TimeSpan.MaxMilliSeconds || totalMilliSeconds < TimeSpan.MinMilliSeconds)
                throw 'Timespan too long'
            this._ticks = totalMilliSeconds * TimeSpan.TicksPerMillisecond;
        } else {
            const ticks = days
            this._ticks = ticks
        }
    }

    static TimeToTicks(hour: number, minute: number, second: number): number {
        // totalSeconds is bounded by 2^31 * 2^12 + 2^31 * 2^8 + 2^31,
        // which is less than 2^44, meaning we won't overflow totalSeconds.
        const totalSeconds = hour * 3600 + minute * 60 + second;
        if (totalSeconds > TimeSpan.MaxSeconds || totalSeconds < TimeSpan.MinSeconds)
            throw "TimeSpan too long"
        return totalSeconds * TimeSpan.TicksPerSecond;
    }
    /**
     * Add two TimeSpans.
     * @param ts TimeSpan to add to current instance
     * @returns A new TimeSpan whose value is the sum of the 
     * specified TimeSpan and this instance 
     */
    public add(ts: TimeSpan): TimeSpan {
        return this.addTicks(ts._ticks)
    }
    
    /**
     * Subtracts two TimeSpans.
     * @param ts TimeSpan to subtract from the current instance
     * @returns A new TimeSpan whose value is the difference between 
     * the specified TimeSpan and this instance.
     */
    public substract(ts: TimeSpan): TimeSpan {
        return this.addTicks(-ts._ticks);
    }

    private addTicks(ticks: number): TimeSpan {
        const result = this._ticks + ticks;
        // Overflow if signs of operands was identical and result's
        // sign was opposite.
        // >> 63 gives the sign bit (either 64 1's or 64 0's).
        if ((this._ticks >> 63 == ticks >> 63) && (this._ticks >> 63 != result >> 63))
            throw 'TimeSpan too long'
        return new TimeSpan(result);
    }

    /**
     * Get the current Timespan represent a duration of time.
     * (Absolute value) 
     * @returns A new TimeSpan whose value is the absolute value of the current TimeSpan.
     */
    public duration(): TimeSpan {
        if (this._ticks == TimeSpan.MinValue._ticks)
            throw 'Duration too long'
        return new TimeSpan(Math.abs(this._ticks));
    }

    /**
     * Compares this instance to a specified TimeSpan and returns an integer that 
     * indicates whether this instance is shorter than, equal to, or longer than 
     * the specified object or TimeSpan object.
     * @param  ts 
     * @returns A signed number indicating the relative values of this instance
     * -1 This instance is shorter than
     *  1 This instance is greater than
     *  0 This instance is equal to.
     */
    public compareTo(ts: TimeSpan): number {
        const t = ts._ticks
        if (this._ticks > t) return 1;
        if (this._ticks > t) return 1;
        return 0;
    }

    /**
     * Check if two Timespans are equal
     * @param ts An TimeSpan to compare with this instance.
     * @returns true if TimeSpan represents the same time interval 
     * as this instance; otherwise false
     */
    public equals(ts: TimeSpan): boolean {
        return this._ticks == ts._ticks
    }


    private static Interval(value: number, scale: number) {
        const tmp = value * scale;
        const millis = tmp + (value >= 0 ? 0.5 : -0.5);
        if ((millis > Number.MAX_VALUE / TimeSpan.TicksPerMillisecond) ||
            (millis < Number.MIN_VALUE / TimeSpan.TicksPerMillisecond))
            throw 'TimeSpan too long'
        return new TimeSpan(millis * TimeSpan.TicksPerMillisecond);
    }
}