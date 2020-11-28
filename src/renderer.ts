import { halfShipHeight, halfShipWidth, PlayerShip, RAD } from "./player-ship";
import { Component } from "./types";
import { timeout } from "./util";

const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";
const UP = "ArrowUp";
const DOWN = "ArrowDown";
const incrementSize = 5;
const DEGREE_INCREMENT = 10;
const DEGREE_OF_SHIP_NOSE_FROM_POS_X_AXIS = 90;

export class Renderer {
  private components: Component[] = [];
  private canvas: HTMLCanvasElement = (document.getElementById("game-space")  as HTMLCanvasElement) || document.createElement("canvas");
  private context: CanvasRenderingContext2D | null;
  private ship: PlayerShip;

  constructor() {
    this.context = this.canvas.getContext("2d");
    const canvasMidX =  Math.floor(this.canvas.width / 2);
    const canvasMidY = Math.floor(this.canvas.height / 2);
    this.ship = new PlayerShip(canvasMidX, canvasMidY)
  }

  addComponent(component: Component) {
    this.components.push(component);
  }

  getNextPosition() {
    let heading = this.ship.deg - DEGREE_OF_SHIP_NOSE_FROM_POS_X_AXIS;
    if (heading < 0) {
      heading = 360 + heading;
    }
    const x = this.ship.x;
    const y = this.ship.y;
    let deg = heading;
    if (heading < 90) {
      const adjacent = Math.cos(deg * RAD) * incrementSize;
      const opposite = Math.sin(deg * RAD) * incrementSize;
      this.ship.setPosition(x + adjacent, y + opposite);
    } else if (heading === 90) {
      this.ship.setPosition(x, y + incrementSize)
    } else if (heading < 180) {
      deg = 180 - heading;
      const adjacent = Math.cos(deg * RAD) * incrementSize;
      const opposite = Math.sin(deg * RAD) * incrementSize;
      this.ship.setPosition(x - adjacent, y + opposite);
    } else if (heading === 180) {
      this.ship.setPosition(x - incrementSize, y);
    } else if (heading < 270) {
      deg = heading - 180;
      const adjacent = Math.cos(deg * RAD) * incrementSize;
      const opposite = Math.sin(deg * RAD) * incrementSize;
      this.ship.setPosition(x - adjacent, y - opposite);
    } else if (heading === 270) {
      this.ship.setPosition(x, y - incrementSize);
    } else {
      deg = 360 - heading;
      const adjacent = Math.cos(deg * RAD) * incrementSize;
      const opposite = Math.sin(deg * RAD) * incrementSize;
      this.ship.setPosition(x + adjacent, y - opposite)
    }

  }

  async pollUntilReady() {
    while (this.components.map((c) => c.isLoaded()).some((loaded) => !loaded)) {
      await timeout(1000)
    }
    document.addEventListener("keydown", (e) => {
      if (!this.context) {
        return;
      }
      switch(e.key) {
        case UP:
          this.getNextPosition();
          this.draw();
          break;
        case DOWN:
          this.ship.y += incrementSize;
          this.draw();
          break;
        case LEFT:
          this.ship.deg = this.ship.deg - DEGREE_INCREMENT;
          if (this.ship.deg < 0) {
            this.ship.deg = 360 + this.ship.deg;
          }
          this.draw();
          break;
        case RIGHT:
          this.ship.deg = (this.ship.deg + DEGREE_INCREMENT) % 360;
          this.draw();
          break;
      }
    })
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ship.draw(this.context);
    for (const component of this.components) {
        component.draw(this.context);
    }
  }
}
