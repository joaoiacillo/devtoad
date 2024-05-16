import { ForemClient } from "./client";
import { ForemREST } from "./rest";
import { ForemArticles } from "./articles";

import { Article } from "./types/Article.interface";
import { ArticleFlareTag } from "./types/ArticleFlareTag.interface";
import { ForemRequest } from "./types/ForemRequest.interface";
import { PaginationOptions } from "./types/PaginationOptions.interface";
import { PublishArticle } from "./types/PublishArticle.interface";
import { SharedOrganization } from "./types/SharedOrganization.interface";
import { SharedUser } from "./types/SharedUser.interface";

export {
  // Classes
  ForemClient,
  ForemREST,
  ForemArticles,

  // Types & Interfaces
  Article,
  ArticleFlareTag,
  ForemRequest,
  PaginationOptions,
  PublishArticle,
  SharedOrganization,
  SharedUser,
};
