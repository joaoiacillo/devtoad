import { ForemREST } from "../src/rest";

import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("[ForemREST->createHeaders] Test", () => {
  const createHeaders = ForemREST.createHeaders;

  it("should return unauthorized headers", () => {
    const expectation = {
      Accept: "application/vnd.forem.api-v1+json",
    };

    const subject = createHeaders({
      accept: "application/vnd.forem.api-v1+json",
    });

    expect(subject).toMatchObject(expectation);
  });

  it("should return authorized headers", () => {
    const API_KEY = "SECRET_API_KEY";

    const expectation = {
      Accept: "application/vnd.forem.api-v1+json",
      "Api-Key": API_KEY,
    };

    const subject = createHeaders(
      {
        accept: "application/vnd.forem.api-v1+json",
        auth: true,
      },
      API_KEY
    );

    expect(subject).toMatchObject(expectation);
  });

  it("should return custom headers", () => {
    const expectation = {
      Accept: "application/vnd.forem.api-v1+json",
      Custom: "123",
    };

    const subject = createHeaders({
      accept: "application/vnd.forem.api-v1+json",
      headers: {
        Custom: "123",
      },
    });

    expect(subject).toMatchObject(expectation);
  });
});

describe("[ForemREST->createUrl] Test", () => {
  const createUrl = ForemREST.createUrl;

  it("should return the base URL", () => {
    const expectation = "https://dev.to/api";

    const subject = createUrl({
      accept: "application/vnd.forem.api-v1+json",
    }).toString();

    expect(subject).toEqual(expectation);
  });

  it("should return the articles endpoint URL", () => {
    const expectation = "https://dev.to/api/articles";

    const subject = createUrl({
      accept: "application/vnd.forem.api-v1+json",
      endpoint: "/articles",
    }).toString();

    expect(subject).toEqual(expectation);
  });

  it("should return the articles endpoint with username query URL", () => {
    const expectation = "https://dev.to/api/articles?username=iacillodev";

    const subject = createUrl({
      accept: "application/vnd.forem.api-v1+json",
      endpoint: "/articles",
      query: {
        username: "iacillodev",
      },
    }).toString();

    expect(subject).toEqual(expectation);
  });
});

describe("[ForemREST] Test", () => {
  const unathenticatedREST = new ForemREST();
  const authenticatedREST = new ForemREST("12345");

  it("should return an array of two objects", async () => {
    mockedAxios.request.mockResolvedValue({
      data: [{}, {}],
    });

    const response = await unathenticatedREST.get({
      accept: "application/vnd.forem.api-v1+json",
    });

    expect(Array.isArray(response.data)).toBeTruthy();
    expect(response.data).toHaveLength(2);
  });

  it("should return an array of articles from iacillodev", async () => {
    mockedAxios.request.mockResolvedValue({
      data: [
        {
          user: {
            username: "iacillodev",
          },
        },
        {
          user: {
            username: "iacillodev",
          },
        },
      ],
    });

    const response = await unathenticatedREST.get({
      accept: "application/vnd.forem.api-v1+json",
    });

    expect(Array.isArray(response.data)).toBeTruthy();
    response.data.forEach((article: Record<string, any>) =>
      expect(article.user.username).toEqual("iacillodev")
    );
  });

  it("should post a new article", async () => {
    const publishDate = new Date().toISOString();

    const article = {
      title: "A simple article",
      body_markdown: "# Testing",
      published: true,
      series: null,
      main_image: null,
      canonical_url: null,
      description: "Testing",
      tags: "",
      organization_id: null,
    };

    mockedAxios.request.mockResolvedValue({
      data: {
        published_at: publishDate,
      },
    });

    const response = await authenticatedREST.post({
      accept: "application/vnd.forem.api-v1+json",
      endpoint: "/articles",
      body: article,
    });

    expect(response.data.published_at).toEqual(publishDate);
  });
});
