"use client";

import Masonry from "react-masonry-css";

import { Painting } from "@/types/Painting";
import CardPreview from "../card-preview/card-preview";

import "@styles/masonry.scss";

type Props = {
  paintingsList: Painting[];
};

const MasonryGallery: React.FC<Props> = ({ paintingsList }) => {
  const breakpointColumnsObj = {
    639: 2,
    1365: 3,
    5000: 4,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {paintingsList.map((painting: Painting) => (
        <CardPreview
          key={painting.id}
          paintingDetails={painting}
        />
      ))}
    </Masonry>
  );
};

export default MasonryGallery;
