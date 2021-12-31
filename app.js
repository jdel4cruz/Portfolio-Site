const hamburger = document.querySelector(".hamburger-btn");
const sidebar = document.querySelector(".sidebar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  sidebar.classList.toggle("open");
});
