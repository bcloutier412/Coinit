const average = require("../utils/for_testing").average;

describe("average", () => {
    test("An single element array is equal to itself", () => {
        expect(average([1])).toBe(1);
    });

    test("Correct average", () => {
        const result = average([1, 2, 3, 4, 5, 6]);

        expect(result).toBe(3.5);
    });

    test("Empty array will return 0", () => {
        const result = average([]);

        expect(result).toBe(0);
    });
});
