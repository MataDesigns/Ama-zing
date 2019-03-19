import DateTime from './datetime';

// March 28 2018
const mar_28_2018DT = new DateTime(2018, 3, 28);
// March 1 2018
const mar_01_2018DT = new DateTime(2018, 3, 1);
// Feb 28 2018
const feb_28_2018DT = new DateTime(2018, 2, 28);
const feb_28_2018D = new Date(2018, 1, 28);
// Jan 31 2018
const jan_31_2018DT = new DateTime(2018, 1, 31);
// March 1 2016
const mar_01_2016DT = new DateTime(2016, 3, 1);
const mar_01_2018D = new Date(2018, 2, 1);
// Feb 28 2016
const feb_28_2016DT = new DateTime(2016, 2, 28);
const feb_29_2016D = new Date(2016, 1, 29);

describe("Comparisons", () => {
    describe("DateTime Date Comparison", () => {
        it("10 Years worth of equalities", () => {
            for (var i = 0; i < (365 * 10); i++) {
                var dateTime = new DateTime(2018, 1, i)
                var date = new Date(2018, 0, i)
                expect(dateTime.equals(date)).toBeTruthy()
            }
        });
        it("10 Years worth of inequalities", () => {
            for (var i = 0; i < (365 * 10); i++) {
                var dateTime = new DateTime(2018, 1, i)
                var date = new Date(2018, 1, i)
                expect(dateTime.equals(date)).toBeFalsy()
            }
        });
    });

    describe("DateTime DateTime Comparison", () => {
        it("10 Years worth of equalities", () => {
            for (var i = 0; i < (365 * 10); i++) {
                const date1 = new DateTime(2018, 1, i)
                const date2 = new DateTime(2018, 1, i)
                expect(date1.equals(date2)).toBeTruthy()

            }
        });

        it("10 Years worth of inequalities", () => {
            for (var i = 0; i < (365 * 10); i++) {
                const date1 = new DateTime(2018, 1, i)
                const date2 = new DateTime(2018, 2, i)
                expect(date1.equals(date2)).toBeFalsy()

            }
        });

    });

    describe("DateTime Number (Epoch Milliseconds) Comparison", () => {
        // February 28th 2018 Epoch for current timezone
        const epochMill = feb_28_2018D.getTime();
        it("Equality", () => {
            expect(feb_28_2018DT.equals(epochMill)).toBeTruthy()
        });
        it("Inequality", () => {
            expect(new DateTime(2018, 1, 28).equals(epochMill)).toBeFalsy()
        });
    });
});

describe("Creation", () => {
    it("Creating February 28 2018", () => {
        expect(new DateTime(2018, 2, 28).equals(new Date(2018, 1, 28))).toBeTruthy()
    });
});

describe("Settings Properties", () => {
    it("Set Date", () => {
        let datetime = new DateTime(2018, 2, 28);
        datetime.date = 2
        expect(datetime.date == 2).toBeTruthy()
    });

    it("Set Date", () => {
        let datetime = new DateTime(2018, 2, 28);
        datetime.date = 31
        expect(datetime.date == 3).toBeTruthy()
    });
})

describe("Arithmetic", () => {
    describe("Days", () => {
        describe("Addition", () => {
            it("February 28 2018 + 1 day == March 1 2018", () => {
                expect(feb_28_2018DT.addDays(1).equals(mar_01_2018D)).toBeTruthy()
            });
            it("February 28 2018 - -1 day == March 1 2018", () => {
                expect(feb_28_2018DT.substractDays(-1).equals(mar_01_2018D)).toBeTruthy()
            });
            it("February 28 2016 + 1 day == February 29 2016", () => {
                expect(feb_28_2016DT.addDays(1).equals(feb_29_2016D)).toBeTruthy()
            });
            it("February 28 2016 - -1 day == February 29 2016", () => {
                expect(feb_28_2016DT.substractDays(-1).equals(feb_29_2016D)).toBeTruthy()
            });
            it("February 28 2016 + 366 days (2016 Leap) + 365 days == February 28 2018", () => {
                expect(feb_28_2016DT.addDays(366).addDays(365).equals(feb_28_2018D)).toBeTruthy()
            });
        });

        describe("Subtracting", () => {
            it("March 1 2018 - 1 day == February 28 2018", () => {
                expect(mar_01_2018DT.substractDays(1).equals(feb_28_2018DT)).toBeTruthy()
            });
            it("March 1 2018 + -1 day == February 28 2018", () => {
                expect(mar_01_2018DT.addDays(-1).equals(feb_28_2018DT)).toBeTruthy()
            });
            it("March 1 2016 - 1 day == February 29 2016", () => {
                expect(mar_01_2016DT.substractDays(1).equals(feb_29_2016D)).toBeTruthy()
            });
            it("March 1 2016 + -1 day == February 29 2016", () => {
                expect(mar_01_2016DT.addDays(-1).equals(feb_29_2016D)).toBeTruthy()
            });
            it("February 28 2018 - 365 days - 366 days (2016 Leap) == February 28 2016", () => {
                expect(feb_28_2018DT.substractDays(365).substractDays(366).equals(feb_28_2016DT)).toBeTruthy()
            });
        });
    });
});

describe("Days Between", () => {
    it("February 29 2018 - February 28 2018 = 1 day", () => {
        expect(new DateTime(feb_29_2016D).daysBetween(feb_28_2016DT) == 1).toBeTruthy();
    });
    it("February 28 2018 - February 29 2018 = 1 day", () => {
        expect(feb_28_2016DT.daysBetween(new DateTime(feb_29_2016D)) == 1).toBeTruthy();
    });
    it("February 28 2016 - February 29 2018 = 731 day", () => {
        expect(feb_28_2016DT.daysBetween(feb_28_2018DT) == 731).toBeTruthy();
    });
});