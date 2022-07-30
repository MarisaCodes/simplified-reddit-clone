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
// this function takes a response object and uses it to build a reddit post
let main = document.querySelector(".reddit-posts");
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
  
  
  
  // code to be executed when user is in creates page
  const community = document.querySelector(".communities");
  const ul = document.querySelector(".community-ul");
  ul.addEventListener("click", (e) => {
    if (e.target.tagName == "SPAN") {
      let spanText = e.target.innerText;
      spanText = spanText.slice(2, spanText.length);
      e.target.parentElement.parentElement.parentElement.previousElementSibling.querySelector(
        "input"
      ).value = spanText;
    }
  });

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
  // plan for following code:
  /* 1. take user input from forms and textarea
     2. use a post method on user input to update the database
     3. display user's post on homepage
     4. user should submit all required info using the post button
  */
  postBtn.addEventListener("click", () => {
    if (!postBtn.classList.contains("empty-input")) {
      let subreddit = selectCommunity.value;
      let titleText = title.value;
      let text = document.querySelector("textarea").value;
      CodeByProjectsAPI.createPost(subreddit, titleText, text)
        .then((response) => {
          if (response) {
            if (response.message) {
              throw Error(response.message);
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });