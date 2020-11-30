export interface Component {
  getPosition(): number[];
  draw(context: CanvasRenderingContext2D): void;
  isLoaded(): boolean;
}

export enum BattleShipFrame {
  NORMAL = "NORMAL",
  THRUST_LOW = "THRUST_LOW",
  THRUST_MED_LOW = "THRUST_MED_LOW",
  THRUST_MED = "THRUST_MED",
  THRUST_HI = "THRUST_HI",
}
