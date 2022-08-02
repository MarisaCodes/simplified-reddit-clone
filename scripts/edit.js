const titleText = document.getElementById("user-title-input");
const text = document.getElementById("user-textrea-input");
const save = document.querySelector(".save-edit-btn");
const cancel = document.querySelector(".cancel-btn");
function getParam(paramName) {
  let param = new URLSearchParams(window.location.search);
  return param.get(paramName);
}
cancel.addEventListener("click", () => {
  window.location.replace("index.html");
});
CodeByProjectsAPI.getPost(Number(getParam("id"))).then((response) => {
  titleText.placeholder = response.title;
  text.placeholder = response.text;
});

save.addEventListener("click", () => {
  if (titleText.value && text.value) {
    CodeByProjectsAPI.updatePost(Number(getParam("id")), {
      title: titleText.value,
      text: text.value,
      edited: true,
    });
    window.location.replace("index.html");
  } else if (titleText.value || text.value) {
    if (titleText.value) {
      CodeByProjectsAPI.updatePost(Number(getParam("id")), {
        title: titleText.value,
        edited: true,
      });
      window.location.replace("index.html");
    } else {
      CodeByProjectsAPI.updatePost(Number(getParam("id")), {
        text: text.value,
        edited: true,
      });
      window.location.replace("index.html");
    }
  }
});

function verifyEdit() {
  if (titleText.value || text.value) {
    save.classList.remove("not-allowed");
  } else {
    save.classList.add("not-allowed");
  }
}
