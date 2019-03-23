export declare enum TimeSpanComponent {
    hours = 1,
    minutes = 2,
    second = 4,
    milliseconds = 8
}
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
    readonly ticks: number;
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
    readonly milliseconds: number;
    readonly totalDays: number;
    readonly totalHours: number;
    readonly totalMinutes: number;
    readonly totalSeconds: number;
    readonly totalMilliseconds: number;
    constructor(ticks: number);
    constructor(hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number);
    static TimeToTicks(hour: number, minute: number, second: number): number;
    add(ts: TimeSpan): TimeSpan;
    substract(ts: TimeSpan): TimeSpan;
    private addTicks;
    duration(): TimeSpan;
    compareTo(ts: TimeSpan): number;
    equals(ts: TimeSpan): boolean;
    static Interval(value: number, scale: number): TimeSpan;
}
