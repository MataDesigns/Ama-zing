import "../dist/index"

describe("Group By", () => {
    it("Main", () => {
        expect([{
            id: 1,
            companyId: 2,
            name: "Jane Doe"
        }, {
            id: 2,
            companyId: 2,
            name: "John Doe"
        }, {
            id: 3,
            companyId: 1,
            name: "Nicholas Mata"
        }].groupBy("companyId")).toEqual({
            1: [{
                id: 3,
                companyId: 1,
                name: "Nicholas Mata"
            }],
            2: [{
                id: 1,
                companyId: 2,
                name: "Jane Doe"
            }, {
                id: 2,
                companyId: 2,
                name: "John Doe"
            }]
        })
    });

});