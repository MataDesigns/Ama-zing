"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeSpanComponent;
(function (TimeSpanComponent) {
    TimeSpanComponent[TimeSpanComponent["hours"] = 1] = "hours";
    TimeSpanComponent[TimeSpanComponent["minutes"] = 2] = "minutes";
    TimeSpanComponent[TimeSpanComponent["second"] = 4] = "second";
    TimeSpanComponent[TimeSpanComponent["milliseconds"] = 8] = "milliseconds";
})(TimeSpanComponent = exports.TimeSpanComponent || (exports.TimeSpanComponent = {}));
class TimeSpan {
    constructor(days, hours, minutes, seconds, milliseconds) {
        if (hours) {
            const totalMilliSeconds = (days * 3600 * 24 + hours * 3600 + (minutes || 0) * 60 + (seconds || 0)) * 1000 + (milliseconds || 0);
            if (totalMilliSeconds > TimeSpan.MaxMilliSeconds || totalMilliSeconds < TimeSpan.MinMilliSeconds)
                throw 'Timespan too long';
            this._ticks = totalMilliSeconds * TimeSpan.TicksPerMillisecond;
        }
        else {
            const ticks = days;
            this._ticks = ticks;
        }
    }
    get ticks() {
        return this._ticks;
    }
    get days() {
        return Math.floor(this._ticks / TimeSpan.TicksPerDay);
    }
    get hours() {
        return Math.floor(this._ticks / TimeSpan.TicksPerHour) % 24;
    }
    get minutes() {
        return Math.floor(this._ticks / TimeSpan.TicksPerMinute) % 60;
    }
    get seconds() {
        return Math.floor(this._ticks / TimeSpan.TicksPerSecond) % 60;
    }
    get milliseconds() {
        return Math.floor(this._ticks / TimeSpan.TicksPerMillisecond) % 1000;
    }
    get totalDays() {
        return this._ticks * TimeSpan.DaysPerTick;
    }
    get totalHours() {
        return this._ticks * TimeSpan.HoursPerTick;
    }
    get totalMinutes() {
        return this._ticks * TimeSpan.MinutesPerTick;
    }
    get totalSeconds() {
        return this._ticks * TimeSpan.SecondsPerTick;
    }
    get totalMilliseconds() {
        const temp = this._ticks * TimeSpan.MillisecondsPerTick;
        if (temp > TimeSpan.MaxMilliSeconds)
            return TimeSpan.MaxMilliSeconds;
        if (temp < TimeSpan.MinMilliSeconds)
            return TimeSpan.MinMilliSeconds;
        return temp;
    }
    static TimeToTicks(hour, minute, second) {
        // totalSeconds is bounded by 2^31 * 2^12 + 2^31 * 2^8 + 2^31,
        // which is less than 2^44, meaning we won't overflow totalSeconds.
        const totalSeconds = hour * 3600 + minute * 60 + second;
        if (totalSeconds > TimeSpan.MaxSeconds || totalSeconds < TimeSpan.MinSeconds)
            throw "TimeSpan too long";
        return totalSeconds * TimeSpan.TicksPerSecond;
    }
    add(ts) {
        return this.addTicks(ts._ticks);
    }
    substract(ts) {
        return this.addTicks(-ts._ticks);
    }
    addTicks(ticks) {
        const result = this._ticks + ticks;
        // Overflow if signs of operands was identical and result's
        // sign was opposite.
        // >> 63 gives the sign bit (either 64 1's or 64 0's).
        if ((this._ticks >> 63 == ticks >> 63) && (this._ticks >> 63 != result >> 63))
            throw 'TimeSpan too long';
        return new TimeSpan(result);
    }
    duration() {
        if (this._ticks == TimeSpan.MinValue._ticks)
            throw 'Duration too long';
        return new TimeSpan(this._ticks >= 0 ? this._ticks : -this._ticks);
    }
    compareTo(ts) {
        const t = ts._ticks;
        if (this._ticks > t)
            return 1;
        if (this._ticks > t)
            return 1;
        return 0;
    }
    equals(ts) {
        return this._ticks == ts._ticks;
    }
    static Interval(value, scale) {
        const tmp = value * scale;
        const millis = tmp + (value >= 0 ? 0.5 : -0.5);
        if ((millis > Number.MAX_VALUE / TimeSpan.TicksPerMillisecond) ||
            (millis < Number.MIN_VALUE / TimeSpan.TicksPerMillisecond))
            throw 'TimeSpan too long';
        return new TimeSpan(millis * TimeSpan.TicksPerMillisecond);
    }
}
TimeSpan.TicksPerMillisecond = 10000;
TimeSpan.MillisecondsPerTick = 1.0 / TimeSpan.TicksPerMillisecond;
TimeSpan.TicksPerSecond = TimeSpan.TicksPerMillisecond * 1000; // 10,000,000
TimeSpan.SecondsPerTick = 1.0 / TimeSpan.TicksPerSecond; // 0.0001
TimeSpan.TicksPerMinute = TimeSpan.TicksPerSecond * 60; // 600,000,000
TimeSpan.MinutesPerTick = 1.0 / TimeSpan.TicksPerMinute; // 1.6666666666667e-9
TimeSpan.TicksPerHour = TimeSpan.TicksPerMinute * 60; // 36,000,000,000
TimeSpan.HoursPerTick = 1.0 / TimeSpan.TicksPerHour; // 2.77777777777777778e-11
TimeSpan.TicksPerDay = TimeSpan.TicksPerHour * 24; // 864,000,000,000
TimeSpan.DaysPerTick = 1.0 / TimeSpan.TicksPerDay; // 1.1574074074074074074e-12
TimeSpan.MillisPerSecond = 1000;
TimeSpan.MillisPerMinute = TimeSpan.MillisPerSecond * 60; //     60,000
TimeSpan.MillisPerHour = TimeSpan.MillisPerMinute * 60; //  3,600,000
TimeSpan.MillisPerDay = TimeSpan.MillisPerHour * 24; // 86,400,000
TimeSpan.MaxSeconds = Number.MAX_SAFE_INTEGER / TimeSpan.TicksPerSecond;
TimeSpan.MinSeconds = Number.MIN_SAFE_INTEGER / TimeSpan.TicksPerSecond;
TimeSpan.MaxMilliSeconds = Number.MAX_VALUE / TimeSpan.TicksPerMillisecond;
TimeSpan.MinMilliSeconds = Number.MIN_VALUE / TimeSpan.TicksPerMillisecond;
TimeSpan.TicksPerTenthSecond = TimeSpan.TicksPerMillisecond * 100;
TimeSpan.Zero = new TimeSpan(0);
TimeSpan.MaxValue = new TimeSpan(Number.MAX_VALUE);
TimeSpan.MinValue = new TimeSpan(Number.MIN_VALUE);
exports.default = TimeSpan;
//# sourceMappingURL=timespan.js.map