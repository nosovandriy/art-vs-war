import { getFiltersData, getPaintings } from "@/utils/api";
import { Metadata } from "next";
import FiltersSection from "./filters-section/filters-section";
import MasonryCatalog from "./massonry-catalog/massonry-catalog";
import MorePaintingsUploading from "./more-paintings-uploading/more-paintings-uploading";
import Preloader from "./preloader";
import MobileSearch from "./search/mobile-search";

import style from "./page.module.scss";

export const metadata: Metadata = {
  title: "Gallery catalog",
  description: "List of paintings in Art vs War GALLERY",
};

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
      <MobileSearch totalPaintings={artCollection.total} />
      <Preloader artCollection={artCollection} />
      <FiltersSection filtersData={filtersData} />

      <div className={style.cards}>
        <MasonryCatalog />
        <MorePaintingsUploading />
      </div>
    </section>
  );
};

export default Gallery;
