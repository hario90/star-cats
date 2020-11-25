export interface ComponentProps {
  src: string;
  context: CanvasRenderingContext2D;
  onload?: () => void;
  x: number;
  y: number;
}
export class Component {
  private context: CanvasRenderingContext2D;
  protected img: HTMLImageElement;
  private x: number;
  private y: number;

  constructor({ src, context, x, y, onload }: ComponentProps) {
    this.img = new Image();
    this.img.src = src;
    this.img.onload = onload || this.onload.bind(this);
    this.context = context;
    this.x = x;
    this.y = y;
  }

  onload() {
    this.context.drawImage(this.img, this.x, this.y)
  }
}
