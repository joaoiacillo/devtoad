import { ArticleFlareTag } from "./ArticleFlareTag.interface";
import { SharedOrganization } from "./SharedOrganization.interface";
import { SharedUser } from "./SharedUser.interface";

export interface Article {
  type_of: string;
  id: number;
  title: string;
  description: string;
  cover_image: string | null;
  readable_publish_date: string;
  social_image: string;
  tag_list: string[];
  tags: string;
  slug: string;
  path: string;
  url: string;
  canonical_url: string;
  positive_reactions_count: number;
  public_reactions_count: number;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  published_timestamp: string;
  reading_time_minutes: number;
  collection_id: number | null;
  comments_count: number;

  body_markdown?: string;
  body_html?: string;

  user: SharedUser;
  flare_tag?: ArticleFlareTag;
  organization?: SharedOrganization;
}
