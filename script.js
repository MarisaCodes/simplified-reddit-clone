const downArrow = document.querySelector(".down-arrow");
const community = document.querySelector(".communities");
downArrow.addEventListener("click", () => {
  if (community.classList.contains("display")) {
    community.classList.remove("display");
  } else {
    community.classList.add("display");
  }
});
