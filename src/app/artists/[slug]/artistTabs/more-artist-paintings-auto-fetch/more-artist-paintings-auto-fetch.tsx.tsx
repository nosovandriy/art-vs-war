"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";

import Loading from "@/app/loading";
import {
  addMoreArtistPaintings,
  increaseArtistGalleryPage,
} from "@/app/redux/slices/artistPaintingsSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { getAllPaintingsByArtist, getPaintingsByArtist } from "@/utils/api";

import style from "./more-artist-paintings-auto-fetch.module.scss";
import createHeaders from "@/utils/getAccessToken";

const MoreArtistPaintingsAutoFetch = () => {
  const [ref, inView] = useInView({
    threshold: 0,
  });

  const { totalSize, artistPaintings, pagesCount, artistId } = useAppSelector(
    (state) => state.artistPaintings
  );

  const pathname = usePathname();
  const isProfile = pathname === '/profile';
  const { user } = useAuthenticator((context) => [context.user]);

  const dispatch = useAppDispatch();

  const isEndPaintingList = totalSize <= artistPaintings.length;

  const handleGetNewPage = async () => {
    const currentPage = pagesCount + 1;

    const moreArtistPaintings = await getPaintingsByArtist(
      artistId,
      currentPage
    );

    dispatch(addMoreArtistPaintings(moreArtistPaintings));
    dispatch(increaseArtistGalleryPage());
  };

  const handleGetNewPageProfile = async () => {
    const currentPage = pagesCount + 1;
    const headers = createHeaders(user);

    const moreArtistPaintings = await getAllPaintingsByArtist(headers, currentPage);

    dispatch(addMoreArtistPaintings(moreArtistPaintings));
    dispatch(increaseArtistGalleryPage());
  }

  useEffect(() => {
    if (inView) {
      isProfile ? handleGetNewPageProfile() : handleGetNewPage();
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

export default MoreArtistPaintingsAutoFetch;
