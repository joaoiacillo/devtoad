import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

import { ForemClient } from "../src/client";
import { PublishArticle } from "../src/types/PublishArticle.interface";

describe("[ForemArticles] Test", () => {
  const unauthenticatedClient = new ForemClient();
  const authenticatedClient = new ForemClient("SECRET_API_KEY");

  it("should return an array of two articles from the user iacillodev", async () => {
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

    const articles = await unauthenticatedClient.articles.fromUser(
      "iacillodev"
    );

    expect(Array.isArray(articles)).toBeTruthy();
    expect(articles).toHaveLength(2);
    articles.forEach((article) =>
      expect(article.user.username).toEqual("iacillodev")
    );
  });

  it("should post a new article", async () => {
    const article: PublishArticle = {
      title: "A new article",
      body_markdown: "# This is a test markdown",
      description: "This is a test markdown...",
      tags: "test",
    };

    mockedAxios.request.mockResolvedValue({
      data: {
        id: 7685,
        title: "A new article",
        body_markdown: "# This is a test markdown",
        description: "This is a test markdown...",
        tags: ["test"],
      },
    });

    const response = await authenticatedClient.articles.publish(article);

    expect(response.id).toEqual(7685);
    expect(response.title).toEqual("A new article");
    expect(response.body_markdown).toEqual("# This is a test markdown");
    expect(response.description).toEqual("This is a test markdown...");
    expect(response.tags).toEqual(expect.arrayContaining(["test"]));
  });

  it("should throw an unathorized error", async () => {
    const article: PublishArticle = {
      title: "A new article",
      body_markdown: "# This is a test markdown",
      description: "This is a test markdown...",
      tags: "test",
    };

    mockedAxios.request.mockResolvedValue({
      status: 401,
    });

    await expect(
      unauthenticatedClient.articles.publish(article)
    ).rejects.toThrow("You're unathorized to do that operation.");
  });

  it("should update an article", async () => {
    const newData: PublishArticle = {
      title: "A new article",
      body_markdown: "# This is a test markdown",
      description: "This is a test markdown...",
      tags: "test",
    };

    mockedAxios.request.mockResolvedValue({
      data: {
        id: 7685,
        title: "A new article",
        body_markdown: "# This is a test markdown",
        description: "This is a test markdown...",
        tags: ["test"],
      },
    });

    const response = await authenticatedClient.articles.update(7685, newData);

    expect(response.id).toEqual(7685);
    expect(response.title).toEqual("A new article");
    expect(response.body_markdown).toEqual("# This is a test markdown");
    expect(response.description).toEqual("This is a test markdown...");
    expect(response.tags).toEqual(expect.arrayContaining(["test"]));
  });

  it("should unpublish an article", async () => {
    mockedAxios.request.mockResolvedValue({});

    const response = await authenticatedClient.articles.unpublish(
      7685,
      "Admin requested"
    );

    expect(response).toBeTruthy();
  });

  it("should fail to unpublish an article on an unauthorized client", async () => {
    mockedAxios.request.mockResolvedValue({
      status: 401,
    });

    await expect(
      unauthenticatedClient.articles.unpublish(7685, "It should fail")
    ).rejects.toThrow("You're unathorized to do that operation.");
  });
});
