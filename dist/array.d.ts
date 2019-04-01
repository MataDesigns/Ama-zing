interface Array<T> {
    groupBy(key: string): {
        [key: string]: [T];
    };
}
declare function groupBy<T extends any>(this: Array<T>, key: string): {
    [key: string]: [T];
};
