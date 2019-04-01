interface Array<T> {
    groupBy(key: string): { [key: string]: [T] }
}

Array.prototype.groupBy = function<T extends any>(this: Array<T>, key: string): { [key: string]: [T] } {
    return this.reduce<{ [key: string]: [T] }>((prev, x) => {
        let existing = prev[x[key]]
        if (existing == null) {
            prev[x[key]] = [x]
        } else {
            existing.push(x)
        }
        return prev
    }, {})
};