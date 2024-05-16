import { ForemREST } from "../rest";

import { ForemArticles } from "../articles";

export class ForemClient {
  private readonly rest: ForemREST;

  public readonly articles: ForemArticles;

  public constructor(apiKey?: string) {
    this.rest = new ForemREST(apiKey);

    this.articles = new ForemArticles(this.rest);
  }
}
