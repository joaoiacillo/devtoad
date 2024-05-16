import { PaginationOptions } from "../types/PaginationOptions.interface";

export function createPaginationQuery(
  options?: PaginationOptions & Record<string, any>
) {
  let query = {} as Record<string, string>;

  if (options?.page) query.page = options.page.toString();
  if (options?.amount) query.per_page = options.amount.toString();

  return query;
}
