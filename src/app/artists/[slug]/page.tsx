import { getArtist, getPaintingsByArtist } from "@/utils/api";
import ArtistPreloader from "./artist-preloader";
import ArtistInfo from "./artistInfo/artistInfo";
import ArtistTabs from "./artistTabs/artistTabs";

import style from "./page.module.scss";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const artistData = await getArtist(params.slug);
    if (!artistData) {
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist",
      };
    }
    return {
      title: `Artist ${artistData.fullName} from ${artistData.country}, ${artistData.city}`,
      description: `${artistData.aboutMe}`,
      alternates: {
        canonical: `/artists/${artistData.prettyId}`,
      },
      openGraph: {
        title: `Artist ${artistData.fullName} from ${artistData.country}, ${artistData.city}`,
        description: `${artistData.aboutMe}`,
        url: `https://artvswar.gallery/artists/${artistData.prettyId}`,
        siteName: "Art vs War GALLERY",
        images: [
          {
            url: `${artistData.imageUrl}`,
          },
        ],
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist",
    };
  }
}

const Artist = async ({ params }: { params: { slug: string } }) => {
  const artistData = getArtist(params.slug);
  const paintingsData = getPaintingsByArtist(params.slug);

  const [artistInfo, paintingsList] = await Promise.all([
    artistData,
    paintingsData,
  ]);

  return (
    <section className={style.artist}>
      <ArtistPreloader paintingsList={paintingsList} artistId={params.slug} />
      <ArtistInfo artistInfo={artistInfo} />
      <ArtistTabs />
    </section>
  );
};

export default Artist;
