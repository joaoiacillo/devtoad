import { PaginationOptions } from "./PaginationOptions.interface";
import { RequestMethod } from "./RequestMethod.enum";

export interface ForemRequest {
  /**
   * Whether it's necessary to send the Api-Token header or not.
   * @default true
   */
  auth?: boolean;

  /**
   * Accept header as required by Forem's API V1.
   * @default
   */
  accept: "application/vnd.forem.api-v1+json";

  /**
   * A set of additional headers to be included in the request if necessary.
   */
  headers?: Record<string, string>;

  /**
   * The endpoint resource that the request is trying to reach.
   * @default "/"
   */
  endpoint?: `/${string}`;

  /**
   * Method to use on the request.
   * @default RequestMethod.GET
   */
  method?: RequestMethod | string;

  /**
   * A set of query parameters to be included in the URL.
   */
  query?: Record<string, string>;

  /**
   * An object that contains pagination info.
   */
  pagination?: PaginationOptions;

  /**
   * The request body. It'll be converted into a JSON string.
   */
  body?: Record<string, any>;
}
