import { UrlBuilder } from "../url";

describe("[UrlBuilder] Test", () => {
  it("should create an url to articles endpoint", () => {
    const builder = new UrlBuilder();

    builder.endpoint("/articles/");
    builder.param("username", "iacillodev");

    const url = builder.build().toString();
    expect(url).toEqual("https://dev.to/api/articles/?username=iacillodev");
  });

  it("should create an url to article based on it's id", () => {
    const builder = new UrlBuilder();

    builder.endpoint("/articles/{id}");
    builder.set("id", 1234);

    const url = builder.build().toString();
    expect(url).toEqual("https://dev.to/api/articles/1234");
  });
});
