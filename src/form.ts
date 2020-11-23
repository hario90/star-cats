const form = (rootEl: HTMLElement, startGame: () => void) => {
  const title = document.createElement("h1");
  const titleText = document.createTextNode("Star Cats");
  title.appendChild(titleText);

  const nameInput = document.createElement("input");
  nameInput.setAttribute("placeholder", "Type a Nickname");
  const helperText = document.createElement("div");
  const helperTextText = document.createTextNode("[Press Enter to Play]");
  helperText.appendChild(helperTextText);
  const centerEl = document.createElement("div");
  centerEl.appendChild(title);
  centerEl.appendChild(nameInput);
  centerEl.appendChild(helperText);
  centerEl.className = "name-form";

  nameInput.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.code.toLowerCase() === "enter") {
      centerEl.remove();
      startGame();
    }
  })

  rootEl.appendChild(centerEl);
};
export default form;
