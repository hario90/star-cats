export interface Component {
  getPosition(): number[];
  draw(context: CanvasRenderingContext2D): void;
  isLoaded(): boolean;
}
