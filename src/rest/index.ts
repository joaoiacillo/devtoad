import axios from "axios";

import { appendSearchParams } from "../utils/appendSearchParams";
import { createPaginationQuery } from "../utils/createPaginationQuery";

import { ForemRequest } from "../types/ForemRequest.interface";
import { ForemRequestHeaders } from "../types/ForemRequestHeaders.interface";
import { RequestMethod } from "../types/RequestMethod.enum";

/**
 * Handles all requests to Forem's API.
 */
export class ForemREST {
  readonly #apiToken?: string;

  public static baseUrl = "https://dev.to/api";

  constructor(apiToken?: string) {
    this.#apiToken = apiToken;
  }

  public static createHeaders(req: ForemRequest, apiToken?: string) {
    let headers: ForemRequestHeaders = {
      Accept: req.accept,
    };

    if (req.headers) Object.assign(headers, req.headers);
    if (req.auth) headers["Api-Key"] = apiToken;

    return headers;
  }

  public static createUrl(req: ForemRequest) {
    let url = new URL(ForemREST.baseUrl);
    if (req.endpoint) url.pathname += req.endpoint;
    if (req.query) appendSearchParams(req.query, url);
    if (req.pagination)
      appendSearchParams(createPaginationQuery(req.pagination), url);
    return url;
  }

  public isAuthenticated() {
    return typeof this.#apiToken !== "undefined";
  }

  public async request(req: ForemRequest) {
    if (typeof req.auth === "undefined") req.auth = true;

    const headers = ForemREST.createHeaders(req, this.#apiToken);
    const url = ForemREST.createUrl(req);
    const body = req.body ? JSON.stringify(req.body) : undefined;
    const method = req.method || RequestMethod.GET;

    return await axios.request({
      method,
      url: url.toString(),
      headers,
      data: body,
    });
  }

  public async get(req: ForemRequest) {
    Object.assign(req, { method: RequestMethod.GET });
    return await this.request(req);
  }

  public async post(req: ForemRequest) {
    Object.assign(req, { method: RequestMethod.POST });
    return await this.request(req);
  }

  public async put(req: ForemRequest) {
    Object.assign(req, { method: RequestMethod.PUT });
    return await this.request(req);
  }

  public async delete(req: ForemRequest) {
    Object.assign(req, { method: RequestMethod.DELETE });
    return await this.request(req);
  }
}
