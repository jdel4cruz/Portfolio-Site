const hamburger = document.querySelector(".hamburger-btn");
const sidebar = document.querySelector(".sidebar");

const jumpLinks = document.querySelectorAll('a[href^="#"]');
console.log(jumpLinks);
// const sections = document.querySelectorAll("section");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  sidebar.classList.toggle("open");
});

jumpLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();

    const section = document.querySelector(a.getAttribute("href"));
    section.scrollIntoView({ behavior: "smooth" });
  });
});
