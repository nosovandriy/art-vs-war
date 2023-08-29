"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

import "./styles.scss";
import "keen-slider/keen-slider.min.css";

const images = [
  "/assets/images/Rectangle3.png",
  "/assets/images/Rectangle4.png",
  "/assets/images/Rectangle5.png",
  "/assets/images/Rectangle6.png",
  "/assets/images/Rectangle7.png",
];

const Carousel = () => {
  const animation = { duration: 90000, easing: (t: number) => t };
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    breakpoints: {
      "(min-width: 300px)": {
        slides: { perView: 1, spacing: 16 },
      },
      "(min-width: 600px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 16 },
      },
    },
    slides: {
      perView: 2,
      spacing: 16,
    },

    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <div ref={sliderRef} className="keen-slider">
      {images.map((image, index) => (
        <div className="keen-slider__slide" key={index}>
          <Image
            className="keen-slider__image"
            src={image}
            alt="art"
            fill
            sizes="(max-width: 1400px) 50vw"
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
