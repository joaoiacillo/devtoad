export interface PaginationOptions {
  /**
   * The current page number.
   * @default 1
   */
  page?: number;

  /**
   * The maximum amount of entities per page.
   * @default 30
   */
  amount?: number;
}
