const hamburger = document.querySelector(".hamburger-btn");
const sidebar = document.querySelector(".sidebar");

const jumpLinks = document.querySelectorAll('a[href^="#"]');
const carouselButtons = document.querySelectorAll("[data-carousel-button]");
// const offScreens = document.querySelectorAll(".offScreen");

const fadeIns = document.querySelectorAll(".fadeIn");

const fadeInOptions = {
  root: null,
  threshold: 0.3,
};

const offScreenOptions = {
  root: null,
  threshold: 0.65,
};

const fadeInObserver = new IntersectionObserver((elements, fadeInObserver) => {
  elements.forEach((element) => {
    if (!element.isIntersecting) {
      return;
    } else {
      element.target.classList.add("appear");
      fadeInObserver.unobserve(element.target);
    }
  });
}, fadeInOptions);

// const offScreenObserver = new IntersectionObserver(
//   (elements, offScreenObserver) => {
//     elements.forEach((element) => {
//       if (!element.isIntersecting) {
//         return;
//       }
//       console.log(element.intersectionRatio);
//       element.target.classList.add("appear");
//       offScreenObserver.unobserve(element.target);
//     });
//   },
//   offScreenOptions
// );

fadeIns.forEach((fadeIn) => {
  fadeInObserver.observe(fadeIn);
});

// offScreens.forEach((offScreen) => {
//   offScreenObserver.observe(offScreen);
// });

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  sidebar.classList.toggle("open");
});

carouselButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;

    const slides = button
      .closest("[data-project-carousel]")
      .querySelector("[data-project-carousel-imgs]");
    console.log(slides.children);

    const activeSlide = slides.querySelector("[data-active]");
    console.log("activeSlide", activeSlide);
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    console.log(newIndex);
    if (newIndex > slides.children.length - 1) {
      newIndex = 0;
    }
    if (newIndex < 0) {
      newIndex = slides.children.length - 1;
    }
    console.log("new index", newIndex);
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

jumpLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();

    const section = document.querySelector(a.getAttribute("href"));
    section.classList.add("appear");

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    hamburger.classList.toggle("open");
    sidebar.classList.toggle("open");
  });
});

var form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);
