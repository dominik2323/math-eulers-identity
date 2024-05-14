import Slider from "./slider";

const PI = Math.PI;
const E = Math.E;

function fact(num) {
  var rval = 1;
  for (var i = 2; i <= num; i++) rval = rval * i;
  return rval;
}

class P {
  x: number;
  y: number;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Euler {
  container: Element;
  canvas: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
  scale: number;
  x: number;
  y: number;
  steps: number;
  iterations: number;
  time: number;

  constructor(conainerId) {
    this.container = document.getElementById(conainerId)!;
    this.canvas = document.createElement("canvas");
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.container.appendChild(this.canvas);
    this.canvasCtx = this.canvas.getContext("2d")!;
    this.canvasCtx.translate(innerWidth / 2, innerHeight / 2);
    this.scale = 150;
    this.drawLine(-innerWidth / 2, 0, innerWidth / 2, 0);
    this.drawLine(0, -innerHeight / 2, 0, innerHeight / 2);
    this.x = 5 * PI;
    this.y = 10 * PI;
    this.steps = 2000;
    this.iterations = 50;
    new Slider(0, 20 * PI, 0.01, this.x, (v) => (this.x = v));
    new Slider(0, 20 * PI, 0.01, this.y, (v) => (this.y = v));
    new Slider(1, 2000, 1, this.steps, (v) => (this.steps = v));
    new Slider(0, 100, 1, this.iterations, (v) => (this.iterations = v));
    this.render();
  }

  drawLine(x1, y1, x2, y2) {
    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(x1, y1);
    this.canvasCtx.lineTo(x2, y2);
    this.canvasCtx.stroke();
  }

  drawPoint(x: number, y: number, color: string = "black") {
    this.canvasCtx.beginPath();
    this.canvasCtx.fillStyle = color;
    this.canvasCtx.arc(x * this.scale, -y * this.scale, 2, 0, 2 * PI);
    this.canvasCtx.fill();
  }

  euler(x: number, y: number, n: number, colorMultipler: number = 1) {
    let xr = 0;
    let yi = 0;

    for (let i = 0; i <= n; i++) {
      const sign = Math.pow(-1, i);
      xr += (sign * Math.pow(x, 2 * i)) / fact(2 * i);
      yi += (sign * Math.pow(y, 2 * i + 1)) / fact(2 * i + 1);
    }
    this.drawPoint(
      xr,
      yi,
      `rgba(${255 * colorMultipler}, ${255 * (1 - colorMultipler)}, ${
        255 * (1 - colorMultipler)
      }, 1)`
    );
  }

  render(t?: number) {
    this.time = t || 0;
    const o = (1 + Math.sin(this.time * 0.0001)) * 2;
    this.canvasCtx.reset();
    this.canvasCtx.translate(innerWidth / 2, innerHeight / 2);
    for (let i = 1; i <= this.steps; i++) {
      this.euler(
        (this.x * i) / this.steps / o,
        (this.y * i) / this.steps,
        this.iterations,
        (i / this.steps) * o
      );
    }

    requestAnimationFrame(this.render.bind(this));
  }
}

new Euler("container");
