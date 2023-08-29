import { getFiltersData, getPaintings } from "@/utils/api";
import Filter from "./filter/filter";
import MasonryCatalog from "./massonry-catalog/massonry-catalog";
import MorePaintingsButton from "./more-paintings-button/more-paintings-button";
import Preloader from "./preloader";
import Sort from "./sort/sort";

import style from "./page.module.scss";

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
      <h1 className={style.title}>Gallery</h1>
      <Preloader artCollection={artCollection} />
      <div className={style.filters}>
        <Sort />
        <Filter filtersData={filtersData} />
      </div>

      <div className={style.cards}>
        <MasonryCatalog />
      </div>
      <MorePaintingsButton />
    </section>
  );
};

export default Gallery;
