import gsap from "gsap";

document.addEventListener("DOMContentLoaded", function () {
  const s = document.querySelector(".slider"),
    sWrapper = s.querySelector(".slider-wrapper"),
    sItem = s.querySelectorAll(".slide"),
    btn = s.querySelectorAll(".slider-link"),
    sWidth = sItem[0].offsetWidth,
    sCount = sItem.length,
    sTotalWidth = sCount * sWidth;

  sWrapper.style.width = sTotalWidth + "px";
  sWrapper.style.width = sTotalWidth + "px";

  let clickCount = 0;

  btn.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.classList.contains("next")) {
        clickCount < sCount - 1 ? clickCount++ : (clickCount = 0);
      } else if (this.classList.contains("prev")) {
        clickCount > 0 ? clickCount-- : (clickCount = sCount - 1);
      }

      gsap.to(sWrapper, { duration: 0.4, x: "-" + sWidth * clickCount });

      //CONTENT ANIMATIONS
      const fromProperties = { autoAlpha: 0, x: "-50", y: "-10" };
      const toProperties = { autoAlpha: 0.8, x: "0", y: "0" };

      const activeSlide = sItem[clickCount];

      gsap.fromTo(
        activeSlide.querySelector(".slide-image img"),
        { duration: 1, autoAlpha: 0, y: "40" },
        { duration: 1, autoAlpha: 1, y: "0" }
      );
      gsap.fromTo(
        activeSlide.querySelector(".slide-date"),
        0.4,
        fromProperties,
        toProperties
      );
      gsap.fromTo(
        activeSlide.querySelector(".slide-title"),
        0.6,
        fromProperties,
        toProperties
      );
      //   gsap.fromTo(
      //     activeSlide.querySelector(".slide-text"),
      //     fromProperties,
      //     toProperties
      //   );
      //   gsap.fromTo(
      //     activeSlide.querySelector(".slide-more"),
      //     1,
      //     fromProperties,
      //     toProperties
      //   );
    });
  });
});
