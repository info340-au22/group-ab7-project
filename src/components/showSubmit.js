export function showSubmit(button, message) {
  let originText = button.textContent;
  button.classList.add("submitted");
  button.textContent = message;
  button.disabled = true;
  setTimeout(() => {
    button.classList.remove("submitted");
    button.textContent = originText;
    button.disabled = false;
  }, 500);
}
