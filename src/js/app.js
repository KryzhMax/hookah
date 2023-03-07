import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "../libs/gsap/ScrollSmoother.min";

// ---------Refs---------

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const works = document.querySelectorAll("[data-works]");
const home = document.querySelector("[data-home]");
const products = document.querySelectorAll("[data-products]");
const about = document.querySelectorAll("[data-about]");
const contacts = document.querySelectorAll("[data-contacts]");

// ---------Scroll events---------

window.addEventListener("scroll", (e) => {
  document.body.style.cssText += `--scrollTop: ${window.scrollY}px`;
});

let smoother = ScrollSmoother.create({
  wrapper: "#scroll-wrapper",
  content: "#smooth-content",
  smooth: 1,
  smoothTouch: 0.3,
  effects: true,
});

// ---------Anchoring---------

function buttonListeners(item, name) {
  if (item instanceof NodeList) {
    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener("click", (e) => {
        smoother.scrollTo(`#${name}`, true);
      });
    }
  } else {
    item.addEventListener("click", (e) => {
      smoother.scrollTo(`#${name}`, true);
    });
  }
}

// ---------Calls---------
buttonListeners(products, "products");
buttonListeners(about, "about");
buttonListeners(contacts, "contacts");
buttonListeners(home, "home");
buttonListeners(works, "works");
