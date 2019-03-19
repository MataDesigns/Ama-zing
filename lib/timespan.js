"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datetime_1 = require("./datetime");
var TimeSpanComponent;
(function (TimeSpanComponent) {
    TimeSpanComponent[TimeSpanComponent["hours"] = 1] = "hours";
    TimeSpanComponent[TimeSpanComponent["minutes"] = 2] = "minutes";
    TimeSpanComponent[TimeSpanComponent["second"] = 4] = "second";
    TimeSpanComponent[TimeSpanComponent["milliseconds"] = 8] = "milliseconds";
})(TimeSpanComponent = exports.TimeSpanComponent || (exports.TimeSpanComponent = {}));
class TimeSpan {
    constructor(hours, minutes, seconds, milliseconds) {
        if (hours instanceof Date) {
            const date = hours;
            this.hours = date.getHours();
            this.minutes = date.getMinutes();
            this.seconds = date.getSeconds();
            this.milliseconds = date.getMilliseconds();
        }
        else {
            this.hours = hours || 0;
            this.minutes = minutes || 0;
            this.seconds = seconds || 0;
            this.milliseconds = milliseconds || 0;
        }
    }
    equality(timespan, check) {
        switch (check) {
            case null:
            case undefined:
                return false;
            case this.hours:
                return this.hours == timespan.hours;
            case this.minutes:
                return this.minutes == timespan.minutes;
            case this.seconds:
                return this.seconds == timespan.seconds;
            case this.milliseconds:
                return this.milliseconds == timespan.milliseconds;
        }
    }
    equals(value, check) {
        let timespan = new TimeSpan();
        if (value instanceof TimeSpan) {
            timespan = value;
        }
        else if (value instanceof Date) {
            timespan = new TimeSpan(value);
        }
        else if (value instanceof datetime_1.default) {
            timespan = value.time;
        }
        return this.equality(timespan, check);
    }
}
exports.default = TimeSpan;
//# sourceMappingURL=timespan.js.map