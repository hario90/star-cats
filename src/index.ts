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
  // Image assets need to load. Don't start animating until they're ready.
  await renderer.pollUntilReady();
  renderer.animate();
})();

