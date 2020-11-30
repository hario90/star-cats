export const BOARD_WIDTH = 3200;
export const BOARD_HEIGHT = 2000;
const OPACITY = 0.15;
const HALF_BOARD_WIDTH = BOARD_WIDTH / 2;
const HALF_BOARD_HEIGHT = BOARD_HEIGHT / 2;
/**
 * Responsible for rendering backdrop for the game.
 */
export class Background {
  private img: HTMLImageElement;
  private loaded: boolean = false;

  constructor() {
    this.img = new Image();
    this.img.onload = () => this.loaded = true;
    this.draw = this.draw.bind(this);
  }

  createQuadrants(context: CanvasRenderingContext2D) {
    // Upper left quadrant is red
    context.fillStyle = `rgba(255, 0, 0, ${OPACITY})`;
    context.fillRect(0, 0, HALF_BOARD_WIDTH, HALF_BOARD_HEIGHT);

    // Upper right quadrant is green
    context.fillStyle = `rgba(0, 255, 0, ${OPACITY})`;
    context.fillRect(HALF_BOARD_WIDTH, 0, HALF_BOARD_WIDTH, HALF_BOARD_HEIGHT);

    // Bottom left quadrant is blue
    context.fillStyle = `rgba(0, 0, 255, ${OPACITY})`;
    context.fillRect(0, HALF_BOARD_HEIGHT, HALF_BOARD_WIDTH, HALF_BOARD_HEIGHT);

    // Bottom right quadrant is yellow
    context.fillStyle = `rgba(255, 255, 0, ${OPACITY})`;
    context.fillRect(HALF_BOARD_WIDTH, HALF_BOARD_HEIGHT, HALF_BOARD_WIDTH, HALF_BOARD_HEIGHT);
  }

  createStars(context: CanvasRenderingContext2D) {
    const starPadding = 40;
    const starDiameter = 2;
    for (let i = 0; i < BOARD_WIDTH; i += starPadding) {
      for (let j = 0; j < BOARD_HEIGHT; j += starPadding) {
        const x = i + (starPadding * Math.random());
        const y = j + (starPadding * Math.random());
        context.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        context.fillRect(x, y, starDiameter, starDiameter);
      }
    }
  }

  create(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    context.fillStyle = "black";
    context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    this.createQuadrants(context);
    this.createStars(context);

    // create an image from the canvas
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
