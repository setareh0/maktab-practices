const icon = document.querySelector(".icon");
const list = document.querySelector(".list-link");
const close = document.querySelector(".closeIcon");

icon.addEventListener("click", () => list.classList.toggle("show"));
close.addEventListener("click", () => list.classList.replace("close"));
