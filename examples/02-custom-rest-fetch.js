/**
 * This is the second example that explains how to use the ForemREST class for
 * doing your own requests directly to the API without using a client. In this
 * example we are grabbing my user information from Dev.to and fetching every
 * comment I made in one of my articles.
 * 
 * Keep in mind that, since you are dealing with API's returned data, there's
 * no type-check safety or autocompletion for responses rather than the ones
 * provided by Axios.
 */

const { ForemREST } = require("../dist/index");

// As entForemCli, the ForemREST class receives an optional API key parameter
// in case you need to provide authentication credentials.
const rest = new ForemREST();

const userId = 1186789;
const articleId = 1676856;

async function fetchArticle(id) {
  // The ForemREST provides a simple interface for doing GET requests, like so:
  return await rest.get({
    // The accept header is mandatory for using the V1.
    // If you use TypeScript, you are forced to add it.
    accept: "application/vnd.forem.api-v1+json",

    // Every request uses the API key that was provided. If you want to not
    // use it, you need to disable it for every request.
    auth: false,

    endpoint: `/articles/${id}`
  });
}

async function fetchUserData(id) {
  // The ForemREST provides a simple interface for doing GET requests, like so:
  return await rest.get({
    // The accept header is mandatory for using the V1.
    // If you use TypeScript, you are forced to add it.
    accept: "application/vnd.forem.api-v1+json",

    // Every request uses the API key that was provided. If you want to not
    // use it, you need to disable it for every request.
    auth: false,

    endpoint: `/users/${id}`
  });
}

async function grabCommentsFromUser(articleId, userId) {
  // The ForemREST provides a simple interface for doing GET requests, like so:
  const response = await rest.get({
    // The accept header is mandatory for using the V1.
    // If you use TypeScript, you are forced to add it.
    accept: "application/vnd.forem.api-v1+json",

    // Every request uses the API key that was provided. If you want to not
    // use it, you need to disable it for every request.
    auth: false,

    endpoint: "/comments",

    // You can easily create search query parameters like so:
    query: {
      a_id: articleId,
    }
  });

  function deepSearch(commentsList) {
    let comments = [];

    for (let comment of commentsList) {
      if (comment.user.user_id === userId) {
        comments.push(comment);
      }

      if (comment.children && comment.children.length > 0) {
        comments.push(...deepSearch(comment.children));
      }
    }

    return comments;
  }

  return deepSearch(response.data);
}

(async function () {
  const article = await fetchArticle(articleId);
  const user = await fetchUserData(userId);

  const comments = await grabCommentsFromUser(articleId, userId);

  console.log(`The user ${user.data.name}, located in ${user.data.location} has over ${comments.length} comments on the article "${article.data.title}", which has an amount of ${article.data.comments_count} comments.`);
})();
