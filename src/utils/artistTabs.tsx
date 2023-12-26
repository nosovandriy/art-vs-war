import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import ArtProcess from "../app/artists/[slug]/artistTabs/artProcess/artProcess";
import ArtistPaintings from "../app/artists/[slug]/artistTabs/artistPaintings/artistPaintings";
import Delivery from "@/app/artists/[slug]/artistTabs/delivery/delivery";
import Payment from '@/app/artists/[slug]/artistTabs/payment/payment';

export const tabs = [
  {
    option: ArtistTabOptions.artworks,
    component: <ArtistPaintings />,
  },
  {
    option: ArtistTabOptions.artProcess,
    component: <ArtProcess />,
  },
  {
    option: ArtistTabOptions.delivery,
    component: <Delivery />,
  },
  {
    option: ArtistTabOptions.payment,
    component: <Payment />,
  },
];

export const renderItem = (selectedTab: ArtistTabOptions) => {
  switch (selectedTab) {
    case ArtistTabOptions.artworks:
      return <ArtistPaintings />;

    case ArtistTabOptions.artProcess:
      return <ArtProcess />;

    case ArtistTabOptions.delivery:
    return <Delivery />;

    case ArtistTabOptions.payment:
      return <Payment />;
  }
};
