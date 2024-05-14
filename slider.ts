class Slider {
  minValue: number;
  maxValue: number;
  step: number;
  initialValue: number;
  container: Element;
  slider: HTMLInputElement;
  cb: (value: number) => void;

  constructor(minValue, maxValue, step, initialValue, cb) {
    console.log(minValue, maxValue, step, initialValue);

    this.minValue = minValue;
    this.maxValue = maxValue;
    this.initialValue = initialValue;
    this.step = step;
    this.container = document.getElementById("controls")!;
    this.appendSlider();
    this.sliderEvents();
    this.cb = cb;
  }

  appendSlider() {
    this.slider = document.createElement("input");
    this.slider.type = "range";
    this.slider.max = String(this.maxValue);
    this.slider.min = String(this.minValue);
    this.slider.step = String(this.step);
    this.slider.value = String(this.initialValue);
    this.container.appendChild(this.slider);
  }

  sliderEvents() {
    this.slider.addEventListener("input", (e) => {
      this.cb(Number((e.target as HTMLInputElement).value));
    });
    this.slider.addEventListener("change", (e) => {
      this.cb(Number((e.target as HTMLInputElement).value));
    });
  }
}

export default Slider;
