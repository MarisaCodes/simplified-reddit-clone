if (window.location.pathname.includes("create.html")) {
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
