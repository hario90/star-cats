import { Component } from "./types";

export const halfShipWidth = 16;
export const halfShipHeight = 16;
export const RAD = Math.PI / 180;

export class PlayerShip implements Component {
  public x: number = 0;
  public y: number = 0;
  public deg: number = 0;
  private img: HTMLImageElement;
  private loaded = false;

  constructor(canvasMidX: number, canvasMidY: number) {
    this.x = canvasMidX - halfShipWidth;
    this.y = canvasMidY - halfShipHeight;
    this.img = new Image();
    this.img.src = "assets/spaceship.png";
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

  draw(context: CanvasRenderingContext2D): void {
    if (!this.loaded) {
      console.error("Image has not loaded yet");
      return;
    }
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.deg * RAD);
    context.drawImage(this.img, 0 - halfShipWidth, 0 - halfShipHeight);
    context.restore();
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
