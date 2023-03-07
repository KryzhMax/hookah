(() => {
  const refs = {
    menuBtnRef: document.querySelector("[data-menu-button]"),
    mobileMenuRef: document.querySelector("[data-menu]"),
  };

  const closeMenu = () => {
    refs.menuBtnRef.classList.remove("is-open");
    refs.menuBtnRef.setAttribute("aria-expanded", false);
    refs.mobileMenuRef.classList.remove("is-open");
    document.removeEventListener("click", closeMenu);
  };

  refs.menuBtnRef.addEventListener("click", (event) => {
    event.stopPropagation();
    const expanded =
      refs.menuBtnRef.getAttribute("aria-expanded") === "true" || false;

    refs.menuBtnRef.classList.toggle("is-open");
    refs.menuBtnRef.setAttribute("aria-expanded", !expanded);

    refs.mobileMenuRef.classList.toggle("is-open");

    if (expanded) {
      document.addEventListener("click", closeMenu);
    }
  });

  const links = document.querySelectorAll(".site-nav__link--mobile");
  [].forEach.call(links, (el) => {
    el.addEventListener("click", () => {
      closeMenu();
    });
  });

  refs.mobileMenuRef.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    closeMenu();
  });
})();
