// Flow to get a user's articles list
// Unathorized : Api-Key not required

const client = new ForemClient("API_KEY");

const username = "iacillodev";

const articles = await client.articles().fromAuthenticatedUser();

console.log(articles);
