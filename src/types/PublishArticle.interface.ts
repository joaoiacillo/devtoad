export interface PublishArticle {
  title: string;
  body_markdown: string;

  /**
   * Whether the article is going to be published at post time or not.
   * @default false
   */
  published?: boolean;

  series?: string | null;
  main_image?: string | null;
  canonical_url?: string | null;
  description: string;
  tags: string;
  organization_id?: number | null;
}
