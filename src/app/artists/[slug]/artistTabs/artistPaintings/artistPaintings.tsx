import { FC } from "react";
import { Painting } from "@/types/Painting";
import MasonryGallery from "@/app/components/masonry/masonry";
import MoreArtistPaintingsButton from "../artProcess/more-artist-paintings/more-artist-paintings";

type Props = {
  paintings: Painting[];
}

const ArtistPaintings: FC<Props> = ({ paintings }) => (
  <>
    <MasonryGallery paintingsList={paintings} />
    <MoreArtistPaintingsButton />
  </>
);

export default ArtistPaintings;
