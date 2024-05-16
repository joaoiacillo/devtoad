import { createPaginationQuery } from "../src/utils/createPaginationQuery";

describe("[createPaginationQuery()] Test", () => {
  it("should return an empty object", () => {
    const query = createPaginationQuery({});
    expect(Object.keys(query)).toHaveLength(0);
  });

  it("should return pagination on page 3 with an amount of 86 pages", () => {
    const query = createPaginationQuery({
      page: 3,
      amount: 86,
    });

    expect(Object.keys(query)).toHaveLength(2);
    expect(query.page).toEqual("3");
    expect(query.per_page).toEqual("86");
  });
});
