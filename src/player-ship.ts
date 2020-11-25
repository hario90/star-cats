const halfShipWidth = 16;
const halfShipHeight = 16;
const shipWidth = 32;
const shipHeight = 32;
const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";
const UP = "ArrowUp";
const DOWN = "ArrowDown";
const incrementSize = 5;
const RAD = Math.PI / 180;

export class PlayerShip {
  private x: number = 0;
  private y: number = 0;
  private deg: number = 0;
  private context: CanvasRenderingContext2D;
  protected img: HTMLImageElement;
  private canvasMidX: number;
  private canvasMidY: number;

  constructor(context: CanvasRenderingContext2D, canvasMidX: number, canvasMidY: number) {
    this.x = canvasMidX - halfShipWidth;
    this.y = canvasMidY - halfShipHeight;
    this.img = new Image();
    this.img.src = "assets/spaceship.png";
    this.img.onload = this.onload.bind(this);
    this.context = context;
    this.canvasMidX = canvasMidX;
    this.canvasMidY = canvasMidY;
  }

  onload() {
    this.context.drawImage(this.img, this.x, this.y);

    document.addEventListener("keydown", (e) => {
      // clear the ship
      // this.context.clearRect(0, 0, 2 * this.canvasMidX, 2 * this.canvasMidY);
      this.context.clearRect(this.x, this.y, shipWidth, shipHeight)
      this.context.save()
      switch(e.key) {
        case UP:
          this.y -= incrementSize;
          break;
        case DOWN:
          this.y += incrementSize;
          break;
        case LEFT:
          this.deg = (this.deg - 20) % 360;
          this.context.rotate(this.deg * RAD);
          // this.x -= incrementSize;
          break;
        case RIGHT:
          this.deg = (this.deg + 20) % 360;
          this.context.rotate(this.deg * RAD);
          break;
      }
      this.context.drawImage(this.img, this.x, this.y);
      this.context.restore();
    })
  }
}
