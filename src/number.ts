declare interface Number {
    pad(length?: number): string
}

Number.prototype.pad = function (length?: number) {
        var s = String(this);
        while (s.length < (length || 2)) { s = '0' + s; }
        return s;
}