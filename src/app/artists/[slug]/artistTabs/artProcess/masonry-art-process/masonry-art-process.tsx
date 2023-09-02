"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";

import { Painting } from "@/types/Painting";

import "@styles/masonry.scss";
import style from "./masonry-art-process.module.scss";
import "@styles/globals.scss";

const images = [
  "/assets/art-process/011.jpg",
  "/assets/art-process/22.jpg",
  "/assets/art-process/33.jpg",
  "/assets/art-process/44.jpg",
  "/assets/art-process/66.jpg",
  "/assets/art-process/77.jpg",
  "/assets/art-process/88.jpg",
  "/assets/art-process/99.jpg",
  "/assets/art-process/110.jpg",
  "/assets/art-process/112.jpg",
  "/assets/art-process/555.jpg",
  "/assets/art-process/1111.jpg",
];

type Props = {
  paintingsList?: Painting[];
};

const MasonryArtProcess: React.FC<Props> = ({ paintingsList }) => {
  const breakpointColumnsObj = {
    639: 2,
    1365: 3,
    5000: 3,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column__art-process"
    >
      {images.map((image, index) => (
        <div key={index} className={style.imageWrapper}>
          <Image
            src={image}
            alt="process"
            width={440}
            height={1600}
            className={`${style.image} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = "1")}
          />
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryArtProcess;
