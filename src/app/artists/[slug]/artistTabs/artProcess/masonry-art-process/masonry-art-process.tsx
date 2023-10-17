"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";

import { ArtProcess } from "@/types/Painting";

import "@styles/globals.scss";
import "@styles/masonry.scss";
import style from "./masonry-art-process.module.scss";

type Props = {
  artProcessImages: ArtProcess[];
};

const MasonryArtProcess: React.FC<Props> = ({ artProcessImages }) => {
  const breakpointColumnsObj = {
    639: 2,
    1365: 3,
    5000: 4,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column__art-process"
    >
      {artProcessImages.map((image, index) => (
        <div key={index} className={style.imageWrapper}>
          <Image
            src={image.imageUrl}
            alt=" art painting process"
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
