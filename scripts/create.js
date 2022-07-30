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
  if (e.target.tagName == "SPAN") {
    community.classList.add("display");
  }
});

let selectCommunity = document.querySelector(".community-input");
let title = document.querySelector("#user-title-input");
let text = document.querySelector("textarea");
// const postText = document.querySelector("#user-textrea-input");
const postBtn = document.querySelector(".post-btn");

// first removing link to new page from a tag that surrounds button

postBtn.parentElement.removeAttribute("href");
function checkUserInput() {
  /*this function checks whether the title input 
    and the choose a community input are blank or not*/
  let selectCommunity = document.querySelector(".community-input");
  let title = document.querySelector("#user-title-input");
  let text = document.querySelector("textarea");
  if (title.value !== "" && selectCommunity.value !== "" && text.value !== "") {
    postBtn.classList.remove("empty-input");

    // now the user can go to post details page after the input is filled

    CodeByProjectsAPI.getPosts().then((response) => {
      postBtn.parentElement.setAttribute(
        "href",
        `post-detail.html?id=${response.length + 1}`
      );
    });
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
