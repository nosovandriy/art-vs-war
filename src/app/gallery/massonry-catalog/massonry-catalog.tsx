"use client";

import { useAppSelector } from "@/types/ReduxHooks";
import MasonryGallery from "@/app/components/masonry/masonry";
import EmptyGalleryPage from "../empty-gallery-page/empty-gallery-page";

const MasonryCatalog = () => {
  const { paintings } = useAppSelector((state) => state.paintings);

  return (
    <>
      {paintings.length !== 0 ? (
        <MasonryGallery paintingsList={paintings} />
      ) : (
        <EmptyGalleryPage />
      )}
    </>
  );
};

export default MasonryCatalog;
