import "./slick.scss";
import "./slick-theme.scss";

import React, { Component } from "react";
import Slider from "react-slick";
import Image from "next/image";

const images = [
  "/assets/images/Rectangle3.png",
  "/assets/images/Rectangle4.png",
  "/assets/images/Rectangle5.png",
  "/assets/images/Rectangle6.png",
  "/assets/images/Rectangle7.png",
];

export default class Carousel extends Component {
  render() {
    const settings = {
      arrows: false,
      dots: false,
      slidesToScroll: 1,
      autoplay: true,
      speed: 10000,
      autoplaySpeed: 0,
      variableWidth: true,
      cssEase: "linear",
      infinite: true,
    };
    return (
      <Slider {...settings}>
        {images.map((image, index) => (
          <Image
            key={index}
            className="image"
            src={image}
            alt="art"
            width={1500}
            height={650}
          />
        ))}
      </Slider>
    );
  }
}
