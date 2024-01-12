"use strict";

const btnScrolling = document.querySelector(".scrolling-btn");
const hiddenEl = document.querySelectorAll(".hidden");
const featuresSection = document.querySelector(".features-section");
const featuresImg = document.querySelectorAll(
  ".features-section .row .row-image img"
);
const navLinks = document.querySelector(".nav-links");
const navBar = document.querySelector(".nav i");
const operationsButtonsContainer = document.querySelector(
  ".operations-buttons"
);
const operationButtons = document.querySelectorAll(".operation-button");
const operationBoxs = document.querySelectorAll(".operation-box");

const testimonials = document.querySelectorAll(".testmonial");
const testimonialBtnLeft = document.querySelector(".testimonial-btn-left");
const testimonialBtnRight = document.querySelector(".testimonial-btn-right");
const dotsContainer = document.querySelector(".dots");
const testimonialDots = document.querySelectorAll(".dot");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const landingPage = document.querySelector(".landing-page");
const navHeight = nav.getBoundingClientRect().height;
// navLinks.forEach(function (link) {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const sectionID = this.getAttribute("href");
//     document.querySelector(sectionID).scrollIntoView({ behavior: "smooth" });
//   });
// });

navBar.addEventListener("click", function () {
  if (navBar.classList.contains("fa-xmark")) {
    navLinks.classList.add("nav-links");
    navLinks.classList.remove("nav-links-mobile");
    navBar.classList.add("fa-bars");
    navBar.classList.remove("fa-xmark");
    document.querySelector(".nav .nav-logo img").style.filter = "";
  } else {
    navLinks.classList.remove("nav-links");
    navLinks.classList.add("nav-links-mobile");
    navBar.classList.remove("fa-bars");
    navBar.classList.add("fa-xmark");
    document.querySelector(".nav .nav-logo img").style.filter =
      "contrast(0%) brightness(180%)";
  }
});

const hiddeNavLinks = function () {
  navLinks.classList.add("nav-links");
  navLinks.classList.remove("nav-links-mobile");
  navBar.classList.add("fa-bars");
  navBar.classList.remove("fa-xmark");
  document.querySelector(".nav .nav-logo img").style.filter = "";
};

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    hiddeNavLinks();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

btnScrolling.addEventListener("click", function () {
  featuresSection.scrollIntoView({ behavior: "smooth" });
});

operationsButtonsContainer.addEventListener("click", function (e) {
  const button = e.target;
  operationButtons.forEach((op) =>
    op.classList.remove("operation-button-active")
  );
  operationBoxs.forEach((box) => box.classList.remove("operation-box-active"));
  button.classList.add("operation-button-active");

  document
    .querySelector(`.operation-box-${button.dataset.operation}`)
    .classList.add("operation-box-active");
});

const hover = function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const linkSiblings = link.closest(".nav").querySelectorAll(".nav-link");

    linkSiblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};

nav.addEventListener("mouseover", hover.bind(0.5));
nav.addEventListener("mouseout", hover.bind(1));

const navstiky = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    hiddeNavLinks();
  } else {
    nav.classList.remove("sticky");
  }
};

const navObserver = new IntersectionObserver(navstiky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navObserver.observe(landingPage);

const hiddenObserver = new IntersectionObserver((entries) =>
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
    else entry.target.classList.remove("show");
  })
);

hiddenEl.forEach((el) => hiddenObserver.observe(el));

const imgLazy = function (entrys) {
  const entry = entrys[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("lazy-img");
};

const imgObserver = new IntersectionObserver(imgLazy, {
  root: null,
  threshold: 0.5,
  rootMargin: "200px",
});
featuresImg.forEach(function (img) {
  imgObserver.observe(img);
});

let curTest = 0;

testimonials.forEach(
  (test, index) => (test.style.transform = `translateX(${100 * index}%)`)
);

const translateTestimonial = function (curTest) {
  testimonials.forEach(
    (test, index) =>
      (test.style.transform = `translateX(${100 * (index - curTest)}%)`)
  );
};

const nextTest = function () {
  if (curTest != testimonials.length - 1) {
    curTest++;
  }

  translateTestimonial(curTest);
  activateDot(curTest);
};
const preTest = function () {
  if (curTest > 0) {
    curTest--;
  }

  translateTestimonial(curTest);
  activateDot(curTest);
};
testimonialBtnRight.addEventListener("click", nextTest);
testimonialBtnLeft.addEventListener("click", preTest);

const activateDot = function (test) {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dot-active"));
  document.querySelector(`.dot[data-dot="${test}"`).classList.add("dot-active");
};

activateDot(0);

dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const test = e.target.dataset.dot;
    activateDot(test);
    translateTestimonial(test);
  }
});
