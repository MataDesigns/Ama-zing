import DateTime from "./datetime";
export declare enum TimeSpanComponent {
    hours = 1,
    minutes = 2,
    second = 4,
    milliseconds = 8
}
export default class TimeSpan {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    constructor(date: Date);
    constructor(hours?: number, minutes?: number, seconds?: number, milliseconds?: number);
    private equality;
    equals(value: Date | TimeSpan | DateTime, check?: TimeSpanComponent): boolean | undefined;
}
