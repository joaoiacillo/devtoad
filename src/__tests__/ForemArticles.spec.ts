import { ForemArticles } from "../articles";

const mockAxios = {
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          canonical_url:
            "https://dev.to/iacillodev/criando-um-zettelkasten-para-organizar-suas-ideias-46fk",
          collection_id: null,
          comments_count: 2,
          cover_image:
            "https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fg3geeturw6kltrtka93a.png",
          created_at: "2023-11-30T16:16:01Z",
          crossposted_at: null,
          description:
            "Todos sabemos que hoje em dia estamos rodeados por uma imensa carga de informações. O problema disso?...",
          edited_at: "2023-12-12T19:32:48Z",
          id: 1684111,
          last_comment_at: "2024-02-23T03:09:31Z",
          path: "/iacillodev/criando-um-zettelkasten-para-organizar-suas-ideias-46fk",
          positive_reactions_count: 68,
          public_reactions_count: 68,
          published_at: "2023-12-06T14:56:02Z",
          published_timestamp: "2023-12-06T14:56:02Z",
          readable_publish_date: "Dec 6 '23",
          reading_time_minutes: 10,
          slug: "criando-um-zettelkasten-para-organizar-suas-ideias-46fk",
          social_image:
            "https://media.dev.to/cdn-cgi/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fg3geeturw6kltrtka93a.png",
          tag_list: ["productivity", "learning", "beginners"],
          tags: "productivity, learning, beginners",
          title: "Criando um Zettelkasten para organizar suas ideias",
          type_of: "article",
          url: "https://dev.to/iacillodev/criando-um-zettelkasten-para-organizar-suas-ideias-46fk",
          user: {
            github_username: "joaoiacillo",
            name: "João Iacillo",
            profile_image:
              "https://media.dev.to/cdn-cgi/image/width=640,height=640,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1186789%2F39355287-6aaf-4652-9464-3abe994b18d8.png",
            profile_image_90:
              "https://media.dev.to/cdn-cgi/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1186789%2F39355287-6aaf-4652-9464-3abe994b18d8.png",
            twitter_username: null,
            user_id: 1186789,
            username: "iacillodev",
            website_url: "https://joaoiacillo.vercel.app/",
          },
        },
        {
          canonical_url:
            "https://dev.to/iacillodev/comecando-nos-estudos-de-data-science-com-python-e-pandas-3hl0",
          collection_id: null,
          comments_count: 4,
          cover_image:
            "https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F3jwl68v07ulkbumaqaur.png",
          created_at: "2023-11-24T01:36:16Z",
          crossposted_at: null,
          description:
            "Entrar no universo de data science vem se tornando cada vez fácil. Isto pois há uma crescente...",
          edited_at: null,
          id: 1676856,
          last_comment_at: "2024-03-20T03:11:35Z",
          path: "/iacillodev/comecando-nos-estudos-de-data-science-com-python-e-pandas-3hl0",
          positive_reactions_count: 50,
          public_reactions_count: 50,
          published_at: "2023-11-24T15:02:33Z",
          published_timestamp: "2023-11-24T15:02:33Z",
          readable_publish_date: "Nov 24 '23",
          reading_time_minutes: 4,
          slug: "comecando-nos-estudos-de-data-science-com-python-e-pandas-3hl0",
          social_image:
            "https://media.dev.to/cdn-cgi/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F3jwl68v07ulkbumaqaur.png",
          tag_list: ["datascience", "python", "pandas", "programming"],
          tags: "datascience, python, pandas, programming",
          title: "Começando nos Estudos de Data Science com Python e Pandas",
          type_of: "article",
          url: "https://dev.to/iacillodev/comecando-nos-estudos-de-data-science-com-python-e-pandas-3hl0",
          user: {
            github_username: "joaoiacillo",
            name: "João Iacillo",
            profile_image:
              "https://media.dev.to/cdn-cgi/image/width=640,height=640,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1186789%2F39355287-6aaf-4652-9464-3abe994b18d8.png",
            profile_image_90:
              "https://media.dev.to/cdn-cgi/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1186789%2F39355287-6aaf-4652-9464-3abe994b18d8.png",
            twitter_username: null,
            user_id: 1186789,
            username: "iacillodev",
            website_url: "https://joaoiacillo.vercel.app/",
          },
        },
      ],
    })
  ),
} as any;

describe("[ForemArticles] Test", () => {
  const foremArticles = new ForemArticles(mockAxios);

  it("should return an array of two articles", async () => {
    const articles = await foremArticles.fromUser("iacillodev");

    expect(Array.isArray(articles)).toBeTruthy();
    expect(articles).toHaveLength(2);
  });
});
