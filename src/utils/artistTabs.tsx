import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import ArtProcess from "../app/artists/[slug]/artistTabs/artProcess/artProcess";
import ArtistPaintings from "../app/artists/[slug]/artistTabs/artistPaintings/artistPaintings";
import Collection from "@/app/components/collection/collection";

export const tabs = [
  {
    option: ArtistTabOptions.artworks,
    component: <ArtistPaintings />,
  },
  {
    option: ArtistTabOptions.collections,
    component: <ArtProcess />,
  },
  {
    option: ArtistTabOptions.artProcess,
    component: <Collection />,
  },
  {
    option: ArtistTabOptions.delivery,
    component: <Collection />,
  },
  {
    option: ArtistTabOptions.payment,
    component: <Collection />,
  },
];

export const renderItem = (selectedTab: ArtistTabOptions) => {
  switch (selectedTab) {
    case ArtistTabOptions.artworks:
      return <ArtistPaintings />;

    case ArtistTabOptions.collections:
      return <Collection />;

    case ArtistTabOptions.artProcess:
      return <ArtProcess />;

    case ArtistTabOptions.delivery:
    return <Collection />;

    case ArtistTabOptions.payment:
    return <Collection />;
  }
};
