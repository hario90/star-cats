import { halfShipHeight, halfShipWidth, PlayerShip, RAD } from "./player-ship";
import { Component } from "./types";
import { timeout } from "./util";

const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";
const UP = "ArrowUp";
const DOWN = "ArrowDown";
const incrementSize = 1;
const DEGREE_INCREMENT = 10;
const DEGREE_OF_SHIP_NOSE_FROM_POS_X_AXIS = 90;
const MAX_SPEED = 5;

export class Renderer {
  private components: Component[] = [];
  private canvas: HTMLCanvasElement = (document.getElementById("game-space")  as HTMLCanvasElement) || document.createElement("canvas");
  private context: CanvasRenderingContext2D | null;
  private ship: PlayerShip;
  private showThrusters = false;

  constructor() {
    this.context = this.canvas.getContext("2d");
    const canvasMidX =  Math.floor(this.canvas.width / 2);
    const canvasMidY = Math.floor(this.canvas.height / 2);
    this.ship = new PlayerShip(canvasMidX, canvasMidY)

    this.draw = this.draw.bind(this);
    this.animate = this.animate.bind(this);
    this.moveAndDraw = this.moveAndDraw.bind(this);
    this.getNextPosition = this.getNextPosition.bind(this);
  }

  addComponent(component: Component) {
    this.components.push(component);
  }

  getNextPosition() {
    const travelDistance = incrementSize * this.ship.speed;
    let heading = this.ship.deg - DEGREE_OF_SHIP_NOSE_FROM_POS_X_AXIS;
    if (heading < 0) {
      heading = 360 + heading;
    }
    const x = this.ship.x;
    const y = this.ship.y;
    let deg = heading;
    if (heading < 90) {
      const adjacent = Math.cos(deg * RAD) * travelDistance;
      const opposite = Math.sin(deg * RAD) * travelDistance;
      this.ship.setPosition(x + adjacent, y + opposite);
    } else if (heading === 90) {
      this.ship.setPosition(x, y + travelDistance)
    } else if (heading < 180) {
      deg = 180 - heading;
      const adjacent = Math.cos(deg * RAD) * travelDistance;
      const opposite = Math.sin(deg * RAD) * travelDistance;
      this.ship.setPosition(x - adjacent, y + opposite);
    } else if (heading === 180) {
      this.ship.setPosition(x - travelDistance, y);
    } else if (heading < 270) {
      deg = heading - 180;
      const adjacent = Math.cos(deg * RAD) * travelDistance;
      const opposite = Math.sin(deg * RAD) * travelDistance;
      this.ship.setPosition(x - adjacent, y - opposite);
    } else if (heading === 270) {
      this.ship.setPosition(x, y - travelDistance);
    } else {
      deg = 360 - heading;
      const adjacent = Math.cos(deg * RAD) * travelDistance;
      const opposite = Math.sin(deg * RAD) * travelDistance;
      this.ship.setPosition(x + adjacent, y - opposite)
    }
  }

  async pollUntilReady() {
    while (this.components.map((c) => c.isLoaded()).some((loaded) => !loaded)) {
      await timeout(1000)
    }
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (!this.context) {
        return;
      }
      switch(e.key) {
        case UP:
          // this.ship.speed = 2;
          this.showThrusters = true;
          break;
        case DOWN:
          if (this.ship.speed > 1) {
            this.showThrusters = false;
            this.ship.speed--;
          }
          break;
        case LEFT:
          this.ship.deg = this.ship.deg - DEGREE_INCREMENT;
          if (this.ship.deg < 0) {
            this.ship.deg = 360 + this.ship.deg;
          }
          break;
        case RIGHT:
          this.ship.deg = (this.ship.deg + DEGREE_INCREMENT) % 360;
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

  animate() {
    if (!this.context) {
      return;
    }
    window.requestAnimationFrame(this.moveAndDraw)
  }

  async moveAndDraw() {
    if (this.showThrusters && this.ship.speed < MAX_SPEED) {
      this.ship.speed++;
    }
    this.getNextPosition();
    this.draw();
    await timeout(50);
    window.requestAnimationFrame(this.moveAndDraw);
  }
}
