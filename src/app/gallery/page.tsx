
import { getFiltersData, getPaintings } from "@/utils/api";
import { Metadata } from "next";
import Filter from "./filter/filter";
import MasonryCatalog from "./massonry-catalog/massonry-catalog";
import MorePaintingsUploading from "./more-paintings-uploading/more-paintings-uploading";
import Preloader from "./preloader";
import Sort from "./sort/sort";

import style from "./page.module.scss";

export const metadata: Metadata = {
  title: 'Gallery catalog',
  description: 'List of paintings in Art vs War GALLERY',
}

const Gallery = async ({
  searchParams,
}: {
  searchParams: { sort: string };
}) => {
  const queryString = Object.keys(searchParams)
    .map(
      (key) =>
        `${key}=${encodeURIComponent(
          searchParams[key as keyof typeof searchParams]
        )}`
    )
    .join("&");

  const artCollection = await getPaintings(queryString || "");
  const filtersData = await getFiltersData();

  return (
    <section className={style.gallery}>
      <div className={style.titleWrapper}>
        <h1 className={style.title}>Gallery</h1>
        <p className={style.title__info}>&nbsp;{`(${artCollection.total})`}</p>
      </div>
      <Preloader artCollection={artCollection} />
      <div className={style.filters}>
        <Sort />
        <Filter filtersData={filtersData} />
      </div>

      <div className={style.cards}>
        <MasonryCatalog />
        <MorePaintingsUploading />
      </div>
    </section>
  );
};

export default Gallery;
