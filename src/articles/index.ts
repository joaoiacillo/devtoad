import { AxiosStatic } from "axios";
import { UrlBuilder } from "../url";
import { Article } from "./types";

export class ForemArticles {
  private readonly axios: AxiosStatic;

  public constructor(axios: AxiosStatic) {
    this.axios = axios;
  }

  public async fromUser(username: string) {
    let urlBuilder = new UrlBuilder();

    urlBuilder.endpoint("/articles/");
    urlBuilder.param("username", username);

    const url = urlBuilder.build().toString();
    const response = await this.axios.get(url);
    return response.data as Article[];
  }
}
