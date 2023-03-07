(() => {
  const refs = {
    openTextBtn: document.querySelectorAll("[data-text-show]"),
  };

  refs.openTextBtn.forEach((btn) => {
    const parentElem = btn.closest(".products__item");
    const hiddenText = parentElem.querySelector("[data-text-hidden]");
    btn.addEventListener("click", () => {
      hiddenText.classList.toggle("is-hidden");
    });
    // console.log(parentElem);
  });
})();
