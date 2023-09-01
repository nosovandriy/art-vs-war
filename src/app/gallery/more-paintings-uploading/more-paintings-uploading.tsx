"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Loading from "@/app/loading";
import {
  addMorePaintings,
  increaseGalleryPage,
} from "@/app/redux/slices/paintingsSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { getPaintings } from "@/utils/api";

import style from "./more-paintings-uploading.module.scss";

const MorePaintingsUploading = () => {
  const [ref, inView] = useInView({
    threshold: 0,
  });

  const { totalSize, paintings, pagesCount } = useAppSelector(
    (state) => state.paintings
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const isEndPaintingList = totalSize <= paintings.length;

  const handleGetNewPage = async () => {
    const params = new URLSearchParams(window.location.search);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    const currentPage = pagesCount + 1;
    const paintings = await getPaintings(
      `${params.toString()}&page=${currentPage}`
    );

    dispatch(addMorePaintings(paintings));
    dispatch(increaseGalleryPage());
  };

  useEffect(() => {
    if (inView) {
      handleGetNewPage();
    }
  }, [inView]);

  return (
    <>
      {!isEndPaintingList && (
        <div ref={ref}>
          <Loading className={style.className} />
        </div>
      )}
    </>
  );
};

export default MorePaintingsUploading;
