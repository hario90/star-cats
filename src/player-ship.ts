import { BattleShipFrame, Component } from "./types";

export const halfShipWidth = 16;
export const halfShipHeight = 15;
export const RAD = Math.PI / 180;

const frameToLocation = new Map([
  [BattleShipFrame.NORMAL, [0, 0]],
  [BattleShipFrame.THRUST_LOW, [2 * halfShipWidth, 0]],
  [BattleShipFrame.THRUST_MED_LOW, [4 * halfShipWidth, 0]],
  [BattleShipFrame.THRUST_MED, [0, 2 * halfShipHeight]],
  [BattleShipFrame.THRUST_HI, [2 * halfShipWidth, 2 * halfShipHeight]]
]);

const speedToFrame = new Map([
  [1, BattleShipFrame.NORMAL],
  [2, BattleShipFrame.THRUST_LOW],
  [3, BattleShipFrame.THRUST_MED_LOW],
  [4, BattleShipFrame.THRUST_MED],
  [5, BattleShipFrame.THRUST_HI],
]);

export class PlayerShip implements Component {
  public x: number = 0;
  public y: number = 0;
  public deg: number = 0;
  public speed: number = 1;
  private img: HTMLImageElement;
  private loaded = false;

  constructor(canvasMidX: number, canvasMidY: number) {
    this.x = canvasMidX - halfShipWidth;
    this.y = canvasMidY - halfShipHeight;
    this.img = new Image();
    this.img.src = "assets/ship.png";
    this.img.onload = () => this.loaded = true;
    this.getPosition = this.getPosition.bind(this);
  }

  getPosition(): number[] {
    return [this.x, this.y];
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  incrementFrame() {

  }

  draw(context: CanvasRenderingContext2D): void {
    if (!this.loaded) {
      console.error("Image has not loaded yet");
      return;
    }
    const frame = speedToFrame.get(this.speed) || BattleShipFrame.NORMAL;
    const srcLocation = frameToLocation.get(frame);
    if (!srcLocation) {
      throw new Error(`Could not find source image for the frame: ${frame}`);
    } else if (srcLocation.length < 2) {
      throw new Error(`Something is wrong with the frameToLocation map`);
    }
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.deg * RAD);
    context.drawImage(this.img, srcLocation[0], srcLocation[1], 2 * halfShipWidth, 2 * halfShipHeight,0 - halfShipWidth, 0 - halfShipHeight, 2 * halfShipWidth, 2 * halfShipHeight);
    context.restore();
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
