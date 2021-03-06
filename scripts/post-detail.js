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
    <span class='id' style='display:none;'></span>
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
  //console.log(data.id);
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
  post.querySelector(".id").innerText = data.id;
  main.appendChild(post);
}

const h3Dots = document.querySelector(".h-3-dots");
const optionsCard = document.querySelector(".options-card");
h3Dots.addEventListener("click", () => {
  if (optionsCard.classList.contains("display")) {
    optionsCard.classList.remove("display");
  } else {
    optionsCard.classList.add("display");
  }
});

function getParam(paramName) {
  let param = new URLSearchParams(window.location.search);
  return param.get(paramName);
}

document
  .querySelector(".edit-btn")
  .setAttribute("href", `edit.html?id=${getParam("id")}`);

window.onload = () => {
  let id = Number(getParam("id"));
  document
    .querySelector(".save-btn")
    .parentElement.setAttribute("href", `index.html?id=${id}`);
  CodeByProjectsAPI.getPost(id).then((response) => {
    createPostsOnload(response);
  });
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let post = document.querySelector(".reddit-post-card");
    let id = Number(post.querySelector(".id").innerText);
    post.remove();
    CodeByProjectsAPI.deletePost(id);
    let saveBtn = document.querySelector(".save-btn");
    saveBtn.parentElement.removeAttribute("href");
    saveBtn.style.cursor = "not-allowed";
    saveBtn.classList.remove("save-btn");
    saveBtn.classList.add("empty-input");
    optionsCard.classList.add("display");
    optionsCard.firstElementChild.removeAttribute("href");
    window.location.replace("index.html");
  }
});
