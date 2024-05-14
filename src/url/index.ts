export class UrlBuilder {
  private static BASE_PATH = "https://dev.to/api/";

  private _endpoint: string = "/";
  private _params: Record<string, string> = {};
  private _variables: Record<string, any> = {};

  public endpoint(newEndpoint: typeof this._endpoint) {
    this._endpoint = newEndpoint;
  }

  public params(newParams: typeof this._params) {
    this._params = newParams;
  }

  public param(name: string, value: string) {
    this._params[name] = value;
  }

  public set(name: string, value: any) {
    this._variables[name] = value;
  }

  public build() {
    let finalEndpoint = this._endpoint;

    finalEndpoint = finalEndpoint.replace(/^\/+/g, "");
    finalEndpoint = finalEndpoint.replace(
      /\{[A-Za-z0-9_]+\}/g,
      (variable: string) => {
        variable = variable.replace(/[\{\}]/g, "");

        if (!Object.hasOwn(this._variables, variable)) {
          throw new Error(
            `Variable "${variable} not present in endpoint: ${this._endpoint}"`
          );
        }

        return this._variables[variable];
      }
    );

    let url = new URL(UrlBuilder.BASE_PATH);
    url.pathname += finalEndpoint;
    Object.entries(this._params).forEach(([name, value]) => {
      url.searchParams.set(name, value);
    });
    return url;
  }
}
