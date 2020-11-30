export const BOARD_WIDTH = 3200;
export const BOARD_HEIGHT = 2000;


export class Background {
  private img: HTMLImageElement;
  private loaded: boolean = false;

  constructor() {
    this.img = new Image();
    this.img.onload = () => { this.loaded = true; };
    this.draw = this.draw.bind(this);
  }

  create(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const starPadding = 40;
    const starDiameter = 2;
    context.fillStyle = "black";
    context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    for (let i = 0; i < BOARD_WIDTH; i += starPadding) {
      for (let j = 0; j < BOARD_HEIGHT; j += starPadding) {
        const x = i + (starPadding * Math.random());
        const y = j + (starPadding * Math.random());
        context.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        context.fillRect(x, y, starDiameter, starDiameter);
      }
    }
    this.img.src = canvas.toDataURL();
  }

  draw(context: CanvasRenderingContext2D, x: number, y: number, canvasWidth: number, canvasHeight: number) {
    if (!this.loaded) {
      console.error("This image has not loaded yet");
      return;
    }
    context.save();
    context.drawImage(this.img, x, y, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight)
    context.restore();
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
