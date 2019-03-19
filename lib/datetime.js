"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timespan_1 = require("./timespan");
var DateTimeComponent;
(function (DateTimeComponent) {
    DateTimeComponent[DateTimeComponent["year"] = 0] = "year";
    DateTimeComponent[DateTimeComponent["month"] = 1] = "month";
    DateTimeComponent[DateTimeComponent["date"] = 2] = "date";
})(DateTimeComponent = exports.DateTimeComponent || (exports.DateTimeComponent = {}));
class DateTime {
    get year() {
        return this.jsDate.getFullYear();
    }
    set year(newYear) {
        this.jsDate.setFullYear(newYear);
    }
    get month() {
        return this.jsDate.getMonth();
    }
    set month(newMonth) {
        this.jsDate.setMonth(newMonth);
    }
    get date() {
        return this.jsDate.getDate();
    }
    set date(newDate) {
        this.jsDate.setDate(newDate);
    }
    constructor(year, month, day, hours, minutes, seconds, milliseconds) {
        if (typeof year === 'undefined' || year === null) {
            this.jsDate = new Date();
        }
        else if (year instanceof Date) {
            this.jsDate = year;
        }
        else {
            if (typeof month === 'undefined' || month == null) {
                this.jsDate = new Date(year);
            }
            else {
                const monthIndex = month - 1;
                this.jsDate = new Date(year, monthIndex, day || 0, hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
            }
        }
        this.time = new timespan_1.default(this.jsDate);
    }
    equality(date, check, fullCheck = true) {
        switch (check) {
            case DateTimeComponent.year:
                return date.getFullYear() == this.year;
            case DateTimeComponent.month:
                return (fullCheck || this.equality(date, DateTimeComponent.year)) &&
                    date.getMonth() == this.month;
            case DateTimeComponent.date:
                return (fullCheck || this.equality(date, DateTimeComponent.month)) &&
                    date.getDate() == this.date;
            case null:
            case undefined:
                return date.getTime() == this.jsDate.getTime();
        }
    }
    equals(date, check, fullCheck = true) {
        if (date instanceof Date || date instanceof DateTime) {
            if (date instanceof DateTime) {
                date = date.jsDate;
            }
            return this.equality(date, check, fullCheck);
        }
        else {
            return date == this.jsDate.valueOf();
        }
    }
    addDays(days) {
        var date = new Date(this.jsDate);
        date.setDate(date.getDate() + days);
        return new DateTime(date);
    }
    substractDays(days) {
        return this.addDays(-days);
    }
    daysBetween(date) {
        if (date instanceof DateTime) {
            date = date.jsDate;
        }
        return (Math.abs(date.getTime() - this.jsDate.getTime()) / 1000) / 60 / 1440;
    }
    [Symbol.toPrimitive](hint) {
        return this.jsDate.valueOf();
    }
}
exports.default = DateTime;
//# sourceMappingURL=datetime.js.map