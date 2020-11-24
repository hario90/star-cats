import './style.css';
import createForm from "./form";
import { setupCanvas } from "./util";

const shipSrc = 'assets/spaceship.png';
const halfShipWidth = 16;
const halfShipHeight = 16;
const padding = 12;
const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";
const UP = "ArrowUp";
const DOWN = "ArrowDown";

const rootEl = document.getElementById("app");
if (rootEl)  {
  const startGame = (name: string) => {
    const canvas = document.createElement("canvas");

    rootEl.appendChild(canvas);
    const { ctx: context, dpr } = setupCanvas(canvas);
    const canvasMidX =  Math.floor(canvas.width / (2 * dpr));
    const canvasMidY = Math.floor(canvas.height / (2 * dpr));
    const ship = new Image();
    ship.src = shipSrc;
    ship.onload = () => {
      if (context) {
        context.drawImage(ship,  canvasMidX - halfShipWidth, canvasMidY - halfShipHeight);
        context.font = "12px  Courier New";
        context.fillStyle = "white"
        context.fillText(name, canvasMidX + halfShipWidth + padding, canvasMidY);

        document.addEventListener("keydown", (e) => {
          console.log(e)
          switch(e.key) {
            case UP:

          }
        })
      }
    }
  }

  createForm(rootEl, startGame);

}
