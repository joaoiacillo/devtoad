import { ForemREST } from "../rest";

import { Article } from "../types/Article.interface";
import { PaginationOptions } from "../types/PaginationOptions.interface";
import { PublishArticle } from "../types/PublishArticle.interface";

export class ForemArticles {
  private readonly rest: ForemREST;

  public constructor(foremFetch: ForemREST) {
    this.rest = foremFetch;
  }

  public async fromUser(username: string, pagination?: PaginationOptions) {
    const response = await this.rest.get({
      accept: "application/vnd.forem.api-v1+json",
      auth: false,
      endpoint: "/articles",
      pagination,
      query: {
        username,
      },
    });

    return response.data as Article[];
  }

  public async fromCurrentUser({
    type = "all",
    pagination,
  }: {
    type?: "all" | "published" | "unpublished";
    pagination?: PaginationOptions;
  }) {
    const response = await this.rest.get({
      accept: "application/vnd.forem.api-v1+json",
      endpoint: `/articles/me/${type}`,
      pagination,
    });

    if (response.status === 401) {
      throw new Error("You're unathorized to do that operation.");
    }

    return response.data as Article[];
  }

  public async latest(pagination?: PaginationOptions) {
    const response = await this.rest.get({
      accept: "application/vnd.forem.api-v1+json",
      endpoint: `/articles/latest`,
      auth: false,
      pagination,
    });

    return response.data as Article[];
  }

  public async popular(since: number = 1) {
    const response = await this.rest.get({
      accept: "application/vnd.forem.api-v1+json",
      endpoint: "/articles",
      auth: false,
      query: {
        top: since.toString(),
      },
    });

    return response.data as Article[];
  }

  private treatPublishArticle(article: PublishArticle) {
    Object.assign(article, {
      published: article.published || false,
      series: article.series || null,
      canonical_url: article.canonical_url || null,
      organization_id: article.organization_id || null,
    });
  }

  public async update(id: number, newData: PublishArticle) {
    this.treatPublishArticle(newData);

    const response = await this.rest.put({
      accept: "application/vnd.forem.api-v1+json",
      endpoint: `/articles/${id}`,
      body: {
        article: newData,
      },
    });

    switch (response.status) {
      case 401:
        throw new Error("You're unathorized to do that operation.");
      case 404:
        throw new Error("That article does not exist.");
      case 422:
        throw new Error("The new article object is missing or is invalid.");
    }

    return response.data as Article;
  }

  public async publish(article: PublishArticle) {
    this.treatPublishArticle(article);

    const response = await this.rest.post({
      accept: "application/vnd.forem.api-v1+json",
      endpoint: "/articles/",
      body: {
        article,
      },
    });

    switch (response.status) {
      case 401:
        throw new Error("You're unathorized to do that operation.");
      case 422:
        throw new Error("The article object is missing or is invalid.");
    }

    return response.data as Article;
  }

  public async unpublish(id: number, note?: string) {
    let query: { note?: string } = {};
    if (note) query.note = note;

    const response = await this.rest.put({
      accept: "application/vnd.forem.api-v1+json",
      endpoint: `/articles/${id}/unpublish`,
      query,
    });

    switch (response.status) {
      case 401:
        throw new Error("You're unathorized to do that operation.");
      case 404:
        throw new Error("That article does not exist.");
    }

    return true;
  }
}
