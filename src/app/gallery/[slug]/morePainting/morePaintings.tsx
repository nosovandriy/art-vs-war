"use client";

import { useEffect, useState } from "react";

import { Painting } from "@/types/Painting";
import { getMorePaintings } from "@/utils/api";
import CardPreview from "@components/card-preview/card-preview";

import style from "./morePaintings.module.scss";

type Props = {
  prettyId: string;
};

const MorePaintings: React.FC<Props> = ({ prettyId }) => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [paintingsQuantity, setPaintingsQuantity] = useState<number | null>(
    null
  );

  const getMorePaintingsFromArtist = async (id: string, size: number) => {
    const paintings = await getMorePaintings(id, size);
    setPaintings(paintings);
  };

  const handleChangeCardQuantity = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 640) {
      setPaintingsQuantity(2);
    } else if (viewportWidth < 768) {
      setPaintingsQuantity(3);
    } else if (viewportWidth < 1366) {
      setPaintingsQuantity(4);
    } else {
      setPaintingsQuantity(5);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleChangeCardQuantity);

    return () => {
      window.removeEventListener("resize", handleChangeCardQuantity);
    };
  }, []);

  useEffect(() => {
    handleChangeCardQuantity();

    if (paintingsQuantity) {
      getMorePaintingsFromArtist(prettyId, paintingsQuantity);
    }
  }, [prettyId, paintingsQuantity]);

  return (
    <div className={style.more__painting}>
      {paintings.map((painting: Painting) => (
        <CardPreview
          paintingDetails={painting}
          key={painting.id}
          className={style.cardPreview}
        />
      ))}
    </div>
  );
};

export default MorePaintings;
