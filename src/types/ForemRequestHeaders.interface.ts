type Headers = Record<string, string | undefined>;

export interface ForemRequestHeaders extends Headers {
  "Api-Key"?: string;
  Accept: "application/vnd.forem.api-v1+json";
}
