import { DateTime } from './index';

// March 28 2018
// const mar_28_2018DT = new DateTime(2018, 3, 28);
// // March 1 2018
// const mar_01_2018DT = new DateTime(2018, 3, 1);
// // Feb 28 2018
// const feb_28_2018DT = new DateTime(2018, 2, 28);
// const feb_28_2018D = new Date(2018, 1, 28);
// // Jan 31 2018
// const jan_31_2018DT = new DateTime(2018, 1, 31);
// // March 1 2016
// const mar_01_2016DT = new DateTime(2016, 3, 1);
// const mar_01_2018D = new Date(2018, 2, 1);
// // Feb 28 2016
// const feb_28_2016DT = new DateTime(2016, 2, 28);
// const feb_29_2016D = new Date(2016, 1, 29);

// describe("Comparisons", () => {
//     describe("DateTime Date Comparison", () => {
//         it("10 Years worth of equalities", () => {
//             const startDate = new DateTime(2018, 1, 1)
//             for (var i = 0; i < (365 * 10); i++) {
//                 try {
//                     const d1 = startDate.addDays(i);
//                     const d2 = new Date(2018, 0, i)
//                     console.log(d1.month)
//                     console.log(d1.year)
//                     console.log(d1.day)
//                     expect(d1.equals(d2)).toBeTruthy()
//                 } catch (err) {
//                     console.error("Error occured on:", i)
//                     throw err;
//                 }
//             }
//         });
//         it("10 Years worth of inequalities", () => {
//             const startDate = new DateTime(2018, 2, 1)
//             for (var i = 0; i < (2); i++) {
//                 const d1 = startDate.addDays(i);
//                 const d2 = new Date(2018, 0, i)
//                 try {
//                     expect(d1.equals(d2)).toBeFalsy()
//                 } catch (err) {
//                     console.error("Error occured on:", i)
//                     console.error(d1.month)
//                     console.error(d1.year)
//                     console.error(d1.day)

//                     console.error(new DateTime(d2))
//                     throw err;
//                 }
//             }
//         });
//     });

// describe("DateTime DateTime Comparison", () => {
//     it("10 Years worth of equalities", () => {
//         for (var i = 0; i < (365 * 10); i++) {
//             const date1 = new DateTime(2018, 1, i)
//             const date2 = new DateTime(2018, 1, i)
//             expect(date1.equals(date2)).toBeTruthy()

//         }
//     });

//     it("10 Years worth of inequalities", () => {
//         for (var i = 0; i < (365 * 10); i++) {
//             const date1 = new DateTime(2018, 1, i)
//             const date2 = new DateTime(2018, 2, i)
//             expect(date1.equals(date2)).toBeFalsy()

//         }
//     });

// });

// describe("DateTime Number (Epoch Milliseconds) Comparison", () => {
//     // February 28th 2018 Epoch for current timezone
//     const epochMill = feb_28_2018D.getTime();
//     it("Equality", () => {
//         expect(feb_28_2018DT.equals(epochMill)).toBeTruthy()
//     });
//     it("Inequality", () => {
//         expect(new DateTime(2018, 1, 28).equals(epochMill)).toBeFalsy()
//     });
// });
// });

describe("DateTime Date Props", () => {
    // it("Constructor Y,M,D", () => {
    //     const birthday = new DateTime(2019, 2, 18);
    //     expect(birthday.year == 2019).toBeTruthy()
    //     expect(birthday.month == 2).toBeTruthy()
    //     expect(birthday.day == 18).toBeTruthy()
    // });

    // it("Year Month Day", () => {
    //     for (let y = 2018; y <= 3000; y++) {
    //         for (let m = 1; m <= 12; m++) {
    //             const daysInMonth = DateTime.DaysInMonth(y, m)
    //             for (let d = 1; d <= daysInMonth; d++) {
    //                 const d1 = new DateTime(y, m, d);
    //                 const year = d1.year;
    //                 const month = d1.month;
    //                 const day = d1.day;
    //                 try {
    //                     expect(year == y).toBeTruthy()
    //                     expect(month == m).toBeTruthy()
    //                     expect(day == d).toBeTruthy()
    //                 } catch (err) {
    //                     console.log("d1.year", year);
    //                     console.log("d1.month", month);
    //                     console.log("d1.day", day);
    //                     console.error(`----------FAILED ${m}/${d}/${y}------------`)
    //                     throw err;
    //                 }
    //             }
    //         }
    //     }
    // });
});

describe('DateTime Time Props', () => {
    // it("Hour Minute Second", () => {
    //     const y = 2019;
    //     for (let m = 1; m <= 1; m++) {
    //         const daysInMonth = DateTime.DaysInMonth(y, m)
    //         for (let d = 1; d <= daysInMonth; d++) {
    //             for (let h = 1; h < 24; h++) {
    //                 for (let min = 1; min < 60; min++) {
    //                     for (let s = 1; s < 60; s++) {
    //                         const d1 = new DateTime(y, m, d, h, min, s);
    //                         const hour = d1.hour
    //                         const minute = d1.minute
    //                         const second = d1.second
    //                         try {
    //                             expect(hour == h).toBeTruthy()
    //                             expect(minute == min).toBeTruthy()
    //                             expect(second == s).toBeTruthy()
    //                         } catch (err) {
    //                             console.error("d1.hour", hour);
    //                             console.error("d1.minute", minute);
    //                             console.error("d1.second", second);
    //                             console.error(`----------FAILED ${m}/${d}/${y}-${h}:${min}:${s}------------`)
    //                             throw err;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });
});


describe('DateTime Props', () => {
    it('DateTime toString', () => {
        const birthday = new DateTime(2019, 2, 18, 5, 20, 1);
        expect(birthday.toString()).toEqual("2019-02-18T05:20:01")
        expect(birthday.toString("yyyy-MM-dd")).toEqual('2019-02-18')
        expect(birthday.toString("MM/dd/yyyy h:mm tt")).toEqual('02/18/2019 5:20 AM')
        expect(birthday.toString("dddd, MMM dd yyyy hh:mm tt")).toEqual('Monday, Feb 18 2019 05:20 AM')
        expect(birthday.toString("'Day Of Week' dddd")).toEqual('Day Of Week Monday')
        expect(birthday.toString("'Month' MMMM 'Day' ddd")).toEqual('Month February Day Mon')
    });
});

// describe("Settings Properties", () => {
//     it("Set Date", () => {
//         let datetime = new DateTime(2018, 2, 28);
//         datetime.date = 2
//         expect(datetime.date == 2).toBeTruthy()
//     });

//     it("Set Date", () => {
//         let datetime = new DateTime(2018, 2, 28);
//         datetime.date = 31
//         expect(datetime.date == 3).toBeTruthy()
//     });
// })

// describe("Arithmetic", () => {
//     describe("Days", () => {
//         describe("Addition", () => {
//             it("February 28 2018 + 1 day == March 1 2018", () => {
//                 expect(feb_28_2018DT.addDays(1).equals(mar_01_2018D)).toBeTruthy()
//             });
//             it("February 28 2018 - -1 day == March 1 2018", () => {
//                 expect(feb_28_2018DT.substractDays(-1).equals(mar_01_2018D)).toBeTruthy()
//             });
//             it("February 28 2016 + 1 day == February 29 2016", () => {
//                 expect(feb_28_2016DT.addDays(1).equals(feb_29_2016D)).toBeTruthy()
//             });
//             it("February 28 2016 - -1 day == February 29 2016", () => {
//                 expect(feb_28_2016DT.substractDays(-1).equals(feb_29_2016D)).toBeTruthy()
//             });
//             it("February 28 2016 + 366 days (2016 Leap) + 365 days == February 28 2018", () => {
//                 expect(feb_28_2016DT.addDays(366).addDays(365).equals(feb_28_2018D)).toBeTruthy()
//             });
//         });

//         describe("Subtracting", () => {
//             it("March 1 2018 - 1 day == February 28 2018", () => {
//                 expect(mar_01_2018DT.substractDays(1).equals(feb_28_2018DT)).toBeTruthy()
//             });
//             it("March 1 2018 + -1 day == February 28 2018", () => {
//                 expect(mar_01_2018DT.addDays(-1).equals(feb_28_2018DT)).toBeTruthy()
//             });
//             it("March 1 2016 - 1 day == February 29 2016", () => {
//                 expect(mar_01_2016DT.substractDays(1).equals(feb_29_2016D)).toBeTruthy()
//             });
//             it("March 1 2016 + -1 day == February 29 2016", () => {
//                 expect(mar_01_2016DT.addDays(-1).equals(feb_29_2016D)).toBeTruthy()
//             });
//             it("February 28 2018 - 365 days - 366 days (2016 Leap) == February 28 2016", () => {
//                 expect(feb_28_2018DT.substractDays(365).substractDays(366).equals(feb_28_2016DT)).toBeTruthy()
//             });
//         });
//     });
// });

// describe("Days Between", () => {
//     it("February 29 2018 - February 28 2018 = 1 day", () => {
//         var date = new DateTime();
//         var toDate = date.addDays(2);
//         console.log(date, toDate)
//         expect(date.daysBetween(toDate) == 2).toBeTruthy();
//     });
//     it("February 28 2018 - February 29 2018 = 1 day", () => {
//         expect(feb_28_2016DT.daysBetween(new DateTime(feb_29_2016D)) == 1).toBeTruthy();
//     });
//     it("February 28 2016 - February 29 2018 = 731 day", () => {
//         expect(feb_28_2016DT.daysBetween(feb_28_2018DT) == 731).toBeTruthy();
//     });
// });