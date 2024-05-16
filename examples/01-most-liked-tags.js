/**
 * This is the first example on how to use the DevToad library for fetching
 * data from Dev.to and knowning the most liked tags since N days using the
 * `popular` article filter.
 */

const { ForemClient, ForemArticles } = require("../dist/index");

// There's no need to provide an API key for the client if you're not going to
// use authenticated-only routes and methods.
const client = new ForemClient();

// An instance of ForemArticles is already created for you by the client. You
// can use this class for fetching data about articles.
const foremArticles = client.articles;

const Since = {
  A_WEEK: 7,
  A_MONTH: 30,
  A_YEAR: 365
}

/**
 * Wrapper function for fetching the most recent and popular articles from the
 * website.
 * 
 * @param {ForemArticles} foremArticles
 * @param {number} since
 */
async function fetchPopularArticles(foremArticles, since) {
  return await foremArticles.popular(since);
}

// Don't worry about this function, it just sorts the tagsAndLikes object from
// higher to lower.
function sortObject(object) {
  return Object.entries(object).sort(([, a], [, b]) => b - a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
}

async function createReport(since = Since.A_WEEK) {
  let tagsAndLikes = {};

  const articles = await fetchPopularArticles(foremArticles, since);

  // We're going through each article to grab their tags and likes.
  articles.forEach(article => {
    const tags = article.tag_list;
    const likes = article.positive_reactions_count;

    tags.forEach(tag => {
      if (tag in tagsAndLikes) {
        tagsAndLikes[tag] += likes;
        return;
      }

      tagsAndLikes[tag] = likes;
    });
  });

  const sortedTagsAndLikes = sortObject(tagsAndLikes);
  return sortedTagsAndLikes;
}

function logReport(initial, report) {
  console.log(`${initial}, these have been the 3 most liked tags:`);

  Object.entries(report).slice(0, 3).forEach(([tag, likes]) => {
    console.log(`  - ${tag}: ${likes} likes`);
  })

  console.log();
}

(async function () {
  const sinceAWeek = await createReport(Since.A_WEEK);
  const sinceAMonth = await createReport(Since.A_MONTH);
  const sinceAYear = await createReport(Since.A_YEAR);

  const title = "Dev.To - Most Liked Tags Report - " + new Date().getFullYear();
  console.log(title);
  console.log("=".repeat(title.length) + "\n");

  logReport("Since a week ago", sinceAWeek);
  logReport("Since a month ago", sinceAMonth);
  logReport("Since a year ago", sinceAYear);
})();