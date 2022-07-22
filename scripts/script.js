if (window.location.pathname.includes("create.html")) { // code to be executed when user is in creates page
  const community = document.querySelector(".communities");
  //clicking the downwards arrow in the create.html page
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("down-arrow")) {
      if (community.classList.contains("display")) {
        community.classList.remove("display");
      } else {
        community.classList.add("display");
      }
    } //clicking the arrow will either show the dropdown list or hide it

    const clickInsidecommunity = community.contains(e.target);
    if (!e.target.classList.contains("down-arrow")) {
      //clicking outside to hide dropdown menu
      if (!e.target.classList.contains("community-input")) {
        if (!clickInsidecommunity) {
          if (!community.classList.contains("display")) {
            community.classList.add("display");
          }
        }
      }
    }
  });

  const selectCommunity = document.querySelector(".community-input");
  const title = document.querySelector("#user-title-input");
  // const postText = document.querySelector("#user-textrea-input");
  const postBtn = document.querySelector(".post-btn");

  // first removing link to new page from a tag that surrounds button

  postBtn.parentElement.removeAttribute("href");
  function checkUserInput() {
    /*this function checks whether the title input 
    and the choose a community input are blank or not*/
    if (title.value !== "" && selectCommunity.value !== "") {
      postBtn.classList.remove("empty-input");

      // now the user can go to post details page after the input is filled

      postBtn.parentElement.setAttribute("href", "post-detail.html");
      postBtn.style.cursor = "pointer";
    } else {
      // if they're blank, style the 'post' button this way
      postBtn.classList.add("empty-input");
      postBtn.parentElement.removeAttribute("href");
      postBtn.style.cursor = "not-allowed";
    }
  }
}

if (
  window.location.pathname.includes("index.html") ||
  window.location.pathname === "/"
) { // code to be executed in root/ index.html page
  let main = document.querySelector(".reddit-posts");

  // inner html of a reddit post div
  const postHtmlTemplate = ` 
  <div class="post-header">
    <span class="sub-name"></span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="clock-icon"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="time-since"></span>
  </div>
  <br />
  <div class="post-title">
    
  </div>
  <div class="post-content"></div>`;
  function calcTimeDiff(timeThen, timeNow) {
    /* function that calculates the time difference between post creation time
    and current local time of user */
    // each of the time values is in the formaat hh:mm (hours:minutes, example 11:56)
    timeThen = timeThen.split(":");
    timeNow = timeNow.split(":");
    let hoursElapsed =
      ((timeNow[0] - timeThen[0]) * 60 + (timeNow[1] - timeThen[1])) / 60;
    if (hoursElapsed < 1) {
      let minsElapsed =
        (timeNow[0] - timeThen[0]) * 60 + (timeNow[1] - timeThen[1]);
      if (!minsElapsed) {
        return "Now";
      } else if (minsElapsed < 60) {
        return minsElapsed == 1
          ? `${minsElapsed} minute ago`
          : `${minsElapsed} minutes ago`;
      }
    } else {
      return Math.trunc(hoursElapsed) == 1
        ? `${Math.trunc(hoursElapsed)} hour ago`
        : `${Math.trunc(hoursElapsed)} hours ago`;
    }
  }

  function timeSinceCalc(created) {
    // this function is more specific since I use it to access the actual data
    //example created value string: (10:41 22) meaning 10:41am and date is 22nd
    let time = new Date();
    let timeNow = `${time.getHours()}` + `:${time.getMinutes()}`;
    let spaceBeforeDay = created.indexOf(" ");
    let dayCreated = created.slice(spaceBeforeDay, created.length); // slicing the "created" string at the space between the time and the date
    if (time.getDate() == dayCreated) {
      let timeCreated = created.substring(0, spaceBeforeDay);
      return calcTimeDiff(timeCreated, timeNow);
    } else {
      // if the post creation date is not equal to the current local date then delete all posts (to later update page)
      let currentPosts = document.querySelector(".reddit-posts").children;
      let arrCurrentPosts = Array.from(currentPosts);
      for (let i = 0; i < arrCurrentPosts.length; i++) {
        arrCurrentPosts[i].remove();
      }
    }
  }

  function createPostsOnload(data) {
    let post = document.createElement("div");
    post.className = "reddit-post-card";
    post.innerHTML = postHtmlTemplate;
    post.querySelector(".sub-name").innerText = `r/${data.subreddit}`;
    post.querySelector(".time-since").innerText = `${timeSinceCalc(
      data.created
    )}`;
    post.querySelector(".post-title").innerText = data.title;
    post.querySelector(".post-content").innerText = data.text;
    main.appendChild(post);
  }
  //CodeByProjectsAPI.setup();
  CodeByProjectsAPI.getPosts().then((response) => {
    if (!response.length) {
      throw Error("could not fetch data");
    } else {
      for (let i = 0; i < response.length; i++) {
        // createPost(); this function creates posts
        createPostsOnload(response[i]);
      }
    }
  });
  // window.onload = () => {
  // };
}

// API Examples

// setup
// run this to add example values to database
// CodeByProjectsAPI.setup();

// getPosts
// return array of posts
// CodeByProjectsAPI.getPosts().then((posts) => {
//   console.log(posts)
// })

// getPost
// return post object
// CodeByProjectsAPI.getPost(id).then((post) => {
//   console.log(post)
// })
// Example: CodeByProjectsAPI.getPost(1)

// createPost
// create a post
// CodeByProjectsAPI.createPost(subreddit, title, text).then(() => {
//   console.log('post created')
// })
// Example: CCodeByProjectsAPI.createPost('learnjavascript', 'my title', 'my text')

// updatePost
// update a post by id
// CodeByProjectsAPI.updatePost(id, data).then(() => {
//   console.log('post updated')
// })
// Example: CodeByProjectsAPI.updatePost(1, {text: 'my updated text})
//

// deletePost
// delete a post by id
// CodeByProjectsAPI.deletePost(id)
// Example: CodeByProjectsAPI.deletePost(1)
