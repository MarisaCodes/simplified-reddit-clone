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

function timeSinceCalc(created, dateStr) {
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
    return dateStr + ` ${created.split(" ")[0]}`;
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
    data.created,
    data.dateStr
  )}`;
  post.querySelector(".post-title").innerText = data.title;
  post.querySelector(".post-content").innerText = data.text;
  if (window.localStorage.getItem(data.id)) {
    let spanId = document.createElement("span");
    spanId.classList.add("id", "display");
    spanId.innerText = data.id;
    let svg = document.createElement("span");
    svg.innerHTML = `<svg
    class="v-3-dots"
    onclick="v3DotsScript(event)"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
    />
  </svg>`;
    let options = document.createElement("div");
    options.classList.add("index-options-card", "display");
    let optionCard = ` 
  <a class="edit-btn">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="pen-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        class="pen-icon"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
    Edit
  </a>

  <hr />
  <div class='delete'>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="trash-can"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        class="trash-can"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
    Delete
  </div>`;
    options.innerHTML = optionCard;
    options.firstElementChild.setAttribute("href", `edit.html?id=${data.id}`);
    post.querySelector(".post-header").appendChild(svg);
    post.querySelector(".post-header").appendChild(spanId);
    post.querySelector(".post-header").appendChild(options);
  }
  main.appendChild(post);
}

function getParam(paramName) {
  let param = new URLSearchParams(window.location.search);
  return param.get(paramName);
}

//CodeByProjectsAPI.setup();
window.onload = () => {
  CodeByProjectsAPI.getPosts().then((response) => {
    if (!response.length) {
      throw Error("could not fetch data");
    } else {
      for (let i = response.length - 1; i >= 0; i--) {
        // createPost(); this function creates posts
        createPostsOnload(response[i]);
      }
      if (getParam("id") !== null) {
        let createdPost = document.querySelector(".reddit-post-card");
        let svg = document.createElement("span");
        svg.innerHTML = `<svg
    class="v-3-dots"
    onclick="v3DotsScript(event)"
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
    />
  </svg>`;
        let spanId = document.createElement("span");
        spanId.classList.add("id", "display");
        spanId.innerText = response[response.length - 1].id;
        createdPost.querySelector(".post-header").appendChild(svg);
        createdPost.querySelector(".post-header").appendChild(spanId);
        localStorage.setItem(
          response[response.length - 1].id,
          createdPost.innerHTML
        );
        location.replace("index.html");
      }
    }
  }); // will add a .catch
};

function v3DotsScript(event) {
  let indexOptions =
    event.target.parentElement.parentElement.parentElement.querySelector(
      ".index-options-card"
    );
  let spanId = event.target.parentElement.parentElement.querySelector(".id");
  if (spanId) {
    //console.log(spanId.innerText);
  }
  if (indexOptions.classList.contains("display")) {
    indexOptions.classList.remove("display");
  } else {
    indexOptions.classList.add("display");
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    let id = Number(
      event.target.parentElement.previousElementSibling.innerText
    );
    CodeByProjectsAPI.deletePost(id);
    event.target.parentElement.classList.add("display");
    event.target.parentElement.parentElement.parentElement.remove();
  }
});
