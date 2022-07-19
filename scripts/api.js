const db = new Dexie('posts')
const isDbOpen = false
db.version(1).stores({
  posts: '++id,subreddit,title,text,created'
});

db.open(() => {
}).catch(() => {
  console.log('Failed to open db')
})
class CodeByProjectsAPI {
  static async setup() {
    const created = Date.now();

    await db.posts.bulkAdd([
      { subreddit: 'javascript', title: 'example javascript title', text: 'example javascript text', created },
      { subreddit: 'learnjavascript', title: 'example learnjavascript title', text: 'example learnjavascript text', created },
      { subreddit: 'react', title: 'example react title', text: 'example react text', created }
    ])
  }

  static async getPosts() {
    const posts = await db.posts.toArray()
    return posts;
  }

  static async getPost(id) {
    if (!id) {
      return {
        message: "id required"
      }
    }
    const post = await db.posts.get(id);
    return post;
  }

  static async updatePost(id, data) {
    if (!id) {
      return {
        message: "id required"
      }
    }
    const updated = await db.posts.update(id, data)
    return updated;
  }

  static async deletePost(id) {
    if (!id) {
      return {
        message: "id required"
      }
    }
    await db.posts.delete(id);
  }

  static async createPost(subreddit, title, text) {
    if (!subreddit) {
      return {
        message: "subreddit required"
      }
    }
    if (!title) {
      return {
        message: "title required"
      }
    }
    if (!text) {
      return {
        message: "text required"
      }
    }
    const created = Date.now();
    await db.posts.add({ subreddit, title, text, created });
  }
}


