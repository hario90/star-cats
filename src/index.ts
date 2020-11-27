import './style.css';
import { ImageComponent } from "./component";
import { Renderer } from "./renderer";

const renderer = new Renderer();
renderer.addComponent(new ImageComponent({
  src: "assets/ufo.png",
  x: 0,
  y: 0
}));

(async () => {
  await renderer.pollUntilReady();
  renderer.draw();
})();

