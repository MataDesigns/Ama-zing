interface Array<T> {
    groupBy(key: string): {
        [key: string]: [T];
    };
}
