const pen = document.querySelector(".pen-icon");
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    pen.style.setProperty("display", "none");
  } else {
    pen.style.setProperty("display", "inline");
  }
});
