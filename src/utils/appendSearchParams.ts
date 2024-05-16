export function appendSearchParams(params: Record<string, string>, url: URL) {
  for (const [param, value] of Object.entries(params)) {
    url.searchParams.set(param, value);
  }
}
