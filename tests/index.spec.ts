import { initialFunction } from "../src/index";

describe("Initial test case", () => {
  it("should return a funny string", () => {
    const result = initialFunction();

    expect(true).toBeTruthy(); // 'Cause why not, right? :D
    expect(false).toBeFalsy(); // And just to make sure one more time...
    
    expect(typeof result).toBe("string");
    expect(result).toHaveLength(35);
    expect(result).toEqual("This is the very first function! :D");
  });
});
