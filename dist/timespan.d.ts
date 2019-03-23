/**
 * @module TimeSpan
 */
/**
 * Represents a time interval.
 */
export default class TimeSpan {
    static readonly TicksPerMillisecond: number;
    private static readonly MillisecondsPerTick;
    static readonly TicksPerSecond: number;
    private static readonly SecondsPerTick;
    static readonly TicksPerMinute: number;
    private static readonly MinutesPerTick;
    static readonly TicksPerHour: number;
    private static readonly HoursPerTick;
    static readonly TicksPerDay: number;
    private static readonly DaysPerTick;
    private static readonly MillisPerSecond;
    private static readonly MillisPerMinute;
    private static readonly MillisPerHour;
    private static readonly MillisPerDay;
    static readonly MaxSeconds: number;
    static readonly MinSeconds: number;
    static readonly MaxMilliSeconds: number;
    static readonly MinMilliSeconds: number;
    static readonly TicksPerTenthSecond: number;
    static readonly Zero: TimeSpan;
    static readonly MaxValue: TimeSpan;
    static readonly MinValue: TimeSpan;
    private _ticks;
    /**
     * Gets the number of ticks that represent the value of
     * he current TimeSpan.
     */
    readonly ticks: number;
    /**
     * Gets the days component of the time interval represented
     * by the current TimeSpan structure.
     */
    readonly days: number;
    /**
     * Gets the hours component of the time interval represented
     * by the current TimeSpan structure.
     */
    readonly hours: number;
    /**
     * Gets the minutes component of the time interval represented
     * by the current TimeSpan structure.
     */
    readonly minutes: number;
    /**
     * Gets the seconds component of the time interval represented
     * by the current TimeSpan structure.
     */
    readonly seconds: number;
    /**
     * Gets the milliseconds component of the time interval represented
     * by the current TimeSpan structure.
     */
    readonly milliseconds: number;
    /**
     * Gets the value of the current TimeSpan structure expressed
     * in whole and fractional days.
     */
    readonly totalDays: number;
    /**
     * Gets the value of the current TimeSpan structure expressed
     * in whole and fractional hours.
     */
    readonly totalHours: number;
    /**
     * Gets the value of the current TimeSpan structure expressed
     * in whole and fractional minutes.
     */
    readonly totalMinutes: number;
    /**
     * Gets the value of the current TimeSpan structure expressed
     * in whole and fractional seconds.
     */
    readonly totalSeconds: number;
    /**
     * Gets the value of the current TimeSpan structure expressed
     * in whole and fractional milliseconds
     */
    readonly totalMilliseconds: number;
    /**
     * Initializes a new instance of the TimeSpan to the specified number of ticks
     * @param ticks A time period expressed in 100-nanosecond units.
     */
    constructor(ticks: number);
    /**
     * Initializes a new instance of the TimeSpan to a specified
     * number of hours, minutes, and seconds.
     * @param hours Number of hours.
     * @param minutes Number of minutes.
     * @param seconds Number of seconds.
     */
    constructor(hours: number, minutes: number, seconds: number);
    /**
     * Initializes a new instance of the TimeSpan to a specified
     * number of days, hours, minutes, and seconds.
     * @param days Number of days.
     * @param hours Number of hours.
     * @param minutes Number of minutes
     * @param seconds Number of seconds
     */
    constructor(days: number, hours: number, minutes: number, seconds: number);
    static TimeToTicks(hour: number, minute: number, second: number): number;
    /**
     * Add two TimeSpans.
     * @param ts TimeSpan to add to current instance
     * @returns A new TimeSpan whose value is the sum of the
     * specified TimeSpan and this instance
     */
    add(ts: TimeSpan): TimeSpan;
    /**
     * Subtracts two TimeSpans.
     * @param ts TimeSpan to subtract from the current instance
     * @returns A new TimeSpan whose value is the difference between
     * the specified TimeSpan and this instance.
     */
    substract(ts: TimeSpan): TimeSpan;
    private addTicks;
    /**
     * Get the current Timespan represent a duration of time.
     * (Absolute value)
     * @returns A new TimeSpan whose value is the absolute value of the current TimeSpan.
     */
    duration(): TimeSpan;
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
    compareTo(ts: TimeSpan): number;
    /**
     * Check if two Timespans are equal
     * @param ts An TimeSpan to compare with this instance.
     * @returns true if TimeSpan represents the same time interval
     * as this instance; otherwise false
     */
    equals(ts: TimeSpan): boolean;
    private static Interval;
}
