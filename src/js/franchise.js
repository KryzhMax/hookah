const refs = {
  openModalBtn: document.querySelectorAll("[data-franchise-open]"),
  closeModalBtn: document.querySelector("[data-franchise-close]"),
  backdrop: document.querySelector("[data-franchise]"),
  body: document.querySelector("body"),
};

function openModal() {
  modalListeners(refs.openModalBtn);
  refs.backdrop.classList.toggle("is-hidden");
  refs.body.classList.toggle("no-scroll");
}

function closeModal() {
  document.removeEventListener("keydown", handleKeyDownAndClick);
  refs.backdrop.removeEventListener("click", handleKeyDownAndClick);
  refs.body.classList.toggle("no-scroll");
  refs.backdrop.classList.toggle("is-hidden");
  removeModalListeners();
}

function removeModalListeners() {
  for (let i = 0; i < refs.openModalBtn.length; i++) {
    // refs.openModalBtn[i].removeEventListener("click", openModal);
    refs.openModalBtn[i].removeEventListener(
      "click",
      modalListeners(refs.openModalBtn)
    );
  }
  refs.closeModalBtn.removeEventListener("click", closeModal);
}

function handleKeyDownAndClick(event) {
  if (event.type === "keydown") {
    if (
      event.key === "Escape" &&
      !refs.backdrop.classList.contains("is-hidden")
    ) {
      closeModal();
    }
  } else if (event.type === "click" && event.target !== refs.backdrop) {
    return;
  } else {
    closeModal();
  }
}

function modalListeners(elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", openModal);
  }
  refs.closeModalBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", handleKeyDownAndClick);
  refs.backdrop.addEventListener("click", handleKeyDownAndClick);
}

modalListeners(refs.openModalBtn);
