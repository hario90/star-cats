import './style.css';
import createForm from "./form";

const rootEl = document.createElement("div");
rootEl.className = "app";
const bodyEl = document.getElementsByTagName("body")[0];
bodyEl.appendChild(rootEl);

const startGame = () => {
  const canvas = document.createElement("canvas");
  rootEl.appendChild(canvas);
}

createForm(rootEl, startGame);


