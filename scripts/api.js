const db = new Dexie("posts");
const isDbOpen = false;
db.version(1).stores({
  posts: "++id,subreddit,title,text,created",
});

db.open(() => {}).catch(() => {
  console.log("Failed to open db");
});
class CodeByProjectsAPI {
  static async setup() {
    //const created = Date.now();
    const date = new Date();
    const created =
      `${date.getHours()}` +
      `:${date.getMinutes()}`.padStart(2, "0") +
      ` ${date.getDate()}`;
    const dateStr = date.toLocaleDateString();
    await db.posts.bulkAdd([
      {
        subreddit: "javascript",
        title: "example javascript title",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, mollitia? Sed, earum libero! Dolorem aspernatur at sit nam repellendus quis.",
        created,
        dateStr,
      },
      {
        subreddit: "learnjavascript",
        title: "Lorem ipsum dolor sit amet.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quam, blanditiis culpa quod impedit eius.",
        created,
        dateStr,
      },
      {
        subreddit: "react",
        title: "example react title",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit voluptatum assumenda possimus accusantium aliquam quam inventore fuga deserunt ratione excepturi, tempora animi vel quasi doloremque nam architecto, aut veniam laborum.",
        created,
        dateStr,
      },
    ]);
  }

  static async getPosts() {
    const posts = await db.posts.toArray();
    return posts;
  }

  static async getPost(id) {
    if (!id) {
      return {
        message: "id required",
      };
    }
    const post = await db.posts.get(id);
    return post;
  }

  static async updatePost(id, data) {
    if (!id) {
      return {
        message: "id required",
      };
    }
    const updated = await db.posts.update(id, data);
    return updated;
  }

  static async deletePost(id) {
    if (!id) {
      return {
        message: "id required",
      };
    }
    await db.posts.delete(id);
  }

  static async createPost(subreddit, title, text) {
    if (!subreddit) {
      return {
        message: "subreddit required",
      };
    }
    if (!title) {
      return {
        message: "title required",
      };
    }
    if (!text) {
      return {
        message: "text required",
      };
    }
    //const created = Date.now();
    const date = new Date();
    const created =
      `${date.getHours()}` +
      `:${date.getMinutes()}`.trim().padStart(2, "0") +
      ` ${date.getDate()}`;
    const dateStr = date.toLocaleDateString();
    await db.posts.add({ subreddit, title, text, created, dateStr });
  }
}
