import './style.css';
import createForm from "./form";

const rootEl = document.getElementById("app");
console.log(rootEl)
if (rootEl)  {
  const startGame = () => {
    const canvas = document.createElement("canvas");
    rootEl.appendChild(canvas);
  }

  createForm(rootEl, startGame);
}
