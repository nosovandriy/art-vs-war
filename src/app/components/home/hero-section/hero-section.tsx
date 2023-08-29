"use client";

import Image from "next/image";
import Link from "next/link";

import style from "./hero-section.module.scss";
import { useEffect, useState } from "react";

type Painting = {
  url: string;
  prettyId: string;
  authorPrettyId: string;
};

type PaintingsData = {
  "2.0": Painting[];
  "1.75": Painting[];
  "1.5": Painting[];
  "1.0": Painting[];
  "1.25": Painting[];
  "0.75": Painting[];
};

type HeroSectionProps = {
  paintings: PaintingsData;
};

const HeroSection = ({ paintings }: HeroSectionProps) => {
  const firstImage2_0 = paintings["2.0"][0];
  const secondImage2_0 = paintings["2.0"][1];
  const firstImage1_75 = paintings["1.75"][0];
  const firstImage1_5 = paintings["1.5"][0];
  const secondImage1_5 = paintings["1.5"][1];
  const firstImage1_25 = paintings["1.25"][0];
  const secondImage1_25 = paintings["1.25"][1];
  const thirdImage1_25 = paintings["1.25"][2];
  const firstImage1_0 = paintings["1.0"][0];
  const secondImage1_0 = paintings["1.0"][1];
  const firstImage0_75 = paintings["0.75"][0];
  const secondImage0_75 = paintings["0.75"][1];

  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);

      setTimeout(() => {
        setShowImage(false);
      }, 3000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className={style.mobile}>
        <h1 className={style.mobile__title}>
          Buy Art
          <br />
          Help Ukraine
        </h1>

        <Image
          src="/assets/hero_image.webp"
          className={style.mobile__background}
          alt="ukrainian art"
          fill
        />
        <Link href={"/gallery"} className={style.mobile__button}>
          Explore
        </Link>
      </div>
      <div className={style.hero}>
        <div className={style.title}>
          <h1 className={style.title__text}>
            Buy Art
            <br /> Help Ukraine
          </h1>
          <Image
            src="/assets/map.webp"
            alt="map of Ukraine"
            width={145}
            height={80}
            className={`${style.imageMap} ${showImage && style.visible}`}
          />
        </div>

        <div className={`${style.first__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage2_0.prettyId}`}>
            <Image
              src={firstImage2_0.url}
              alt={`Painting ${firstImage2_0.prettyId} by artist ${firstImage2_0.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.second__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage0_75.prettyId}`}>
            <Image
              src={firstImage0_75.url}
              alt={`Painting ${firstImage0_75.prettyId} by artist ${firstImage0_75.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.third__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage1_25.prettyId}`}>
            <Image
              src={firstImage1_25.url}
              alt={`Painting ${firstImage1_25.prettyId} by artist ${firstImage1_25.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.fourth__image} ${style.images}`}>
          <Link href={`/gallery/${secondImage2_0.prettyId}`}>
            <Image
              src={secondImage2_0.url}
              alt={`Painting ${secondImage2_0.prettyId} by artist ${secondImage2_0.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.fifth__image} ${style.images}`}>
          <Link href={`/gallery/${secondImage0_75.prettyId}`}>
            <Image
              src={secondImage0_75.url}
              alt={`Painting ${secondImage0_75.prettyId} by artist ${secondImage0_75.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.sixth__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage1_0.prettyId}`}>
            <Image
              src={firstImage1_0.url}
              alt={`Painting ${firstImage1_0.prettyId} by artist ${firstImage1_0.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.seventh__image} ${style.images}`}>
          <Link href={`/gallery/${secondImage1_0.prettyId}`}>
            <Image
              src={secondImage1_0.url}
              alt={`Painting ${secondImage1_0.prettyId} by artist ${secondImage1_0.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.eighth__image} ${style.images}`}>
          <Link href={`/gallery/${secondImage1_25.prettyId}`}>
            <Image
              src={secondImage1_25.url}
              alt={`Painting ${secondImage1_25.prettyId} by artist ${secondImage1_25.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.ninth__image} ${style.images}`}>
          <Link href={`/gallery/${thirdImage1_25.prettyId}`}>
            <Image
              src={thirdImage1_25.url}
              alt={`Painting ${thirdImage1_25.prettyId} by artist ${thirdImage1_25.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.tenth__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage1_5.prettyId}`}>
            <Image
              src={firstImage1_5.url}
              alt={`Painting ${firstImage1_5.prettyId} by artist ${firstImage1_5.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.eleventh__image} ${style.images}`}>
          <Link href={`/gallery/${secondImage1_5.prettyId}`}>
            <Image
              src={secondImage1_5.url}
              alt={`Painting ${secondImage1_5.prettyId} by artist ${secondImage1_5.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.twelfth__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage1_75.prettyId}`}>
            <Image
              src={firstImage1_75.url}
              alt={`Painting ${firstImage1_75.prettyId} by artist ${firstImage1_75.authorPrettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <Link href={"/gallery"} className={style.additionalButton}>
          More artworks
        </Link>
        <Link href={"/gallery"} className={style.button}>
          Explore
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
