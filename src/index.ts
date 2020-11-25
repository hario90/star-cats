import './style.css';
import { Component } from "./component";
import { PlayerShip } from "./player-ship";

const startGame = () => {
  const canvas = (document.getElementById("game-space")  as HTMLCanvasElement) || document.createElement("canvas");
  const context = canvas.getContext("2d");

  const canvasMidX =  Math.floor(canvas.width / 2);
  const canvasMidY = Math.floor(canvas.height / 2);

  if (context) {
    new Component({
      src: "assets/ufo.png",
      context,
      x: 0,
      y: 0
    });
    new PlayerShip(context, canvasMidX, canvasMidY);
  }
}

startGame();
