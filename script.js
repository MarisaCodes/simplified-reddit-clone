const createPost = document.querySelector(".create-post-wrapper");
const community = document.querySelector(".communities");
const communityUl = document.querySelector(".community-ul");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("down-arrow")) {
    if (community.classList.contains("display")) {
      community.classList.remove("display");
    } else {
      community.classList.add("display");
    }
  }

  const clickInsidecommunityUl = communityUl.contains(e.target);
  if (!e.target.classList.contains("down-arrow")) {
    if (!e.target.classList.contains("community-input")) {
      if (!clickInsidecommunityUl) {
        if (!community.classList.contains("display")) {
          community.classList.add("display");
        }
      }
    }
  }
});
