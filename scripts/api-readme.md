# How to use CodeByProjects API
 --- 

API Examples

- setup
run this to add example values to database
CodeByProjectsAPI.setup();

- getPosts
return array of posts
CodeByProjectsAPI.getPosts().then((posts) => {
  console.log(posts)
})

- getPost
return post object
CodeByProjectsAPI.getPost(id).then((post) => {
  console.log(post)
})
Example: CodeByProjectsAPI.getPost(1)

- createPost
create a post
CodeByProjectsAPI.createPost(subreddit, title, text).then(() => {
  console.log('post created')
})
Example: CCodeByProjectsAPI.createPost('learnjavascript', 'my title', 'my text')

- updatePost
update a post by id
CodeByProjectsAPI.updatePost(id, data).then(() => {
  console.log('post updated')
})
Example: CodeByProjectsAPI.updatePost(1, {text: 'my updated text})


- deletePost
delete a post by id
CodeByProjectsAPI.deletePost(id)
Example: CodeByProjectsAPI.deletePost(1)
