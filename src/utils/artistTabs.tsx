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
    component: <Collection title="This feature is under development now!" />,
  },
  {
    option: ArtistTabOptions.artProcess,
    component: <ArtProcess />,
  },
  {
    option: ArtistTabOptions.delivery,
    component: <Collection title="This feature is under development now!" />,
  },
  {
    option: ArtistTabOptions.payment,
    component: <Collection title="This feature is under development now!" />,
  },
];

export const renderItem = (selectedTab: ArtistTabOptions) => {
  switch (selectedTab) {
    case ArtistTabOptions.artworks:
      return <ArtistPaintings />;

    case ArtistTabOptions.collections:
      return <Collection title="This feature is under development now!" />;

    case ArtistTabOptions.artProcess:
      return <ArtProcess />;

    case ArtistTabOptions.delivery:
    return <Collection title="This feature is under development now!" />;

    case ArtistTabOptions.payment:
    return <Collection title="This feature is under development now!" />;
  }
};
