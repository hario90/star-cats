import { Component } from "./types";

export interface ComponentProps {
  src: string;
  x: number;
  y: number;
}

export class ImageComponent implements Component {
  private img: HTMLImageElement;
  private x: number = 0;
  private y: number = 0;
  private loaded: boolean = false;

  constructor({ src, x, y }: ComponentProps) {
    this.img = new Image();
    this.img.src = src;
    this.img.onload = () => { this.loaded = true; };
    this.x = x;
    this.y = y;
    this.draw = this.draw.bind(this);
  }

  draw(context: CanvasRenderingContext2D) {
    if (!this.loaded) {
      console.error("This image has not loaded yet");
      return;
    }
    context.drawImage(this.img, this.x, this.y)
  }

  getPosition(): number[] {
    return [this.x, this.y];
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
