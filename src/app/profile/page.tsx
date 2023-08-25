"use client";

import { useEffect, useState } from "react";

import { Artist } from "@/types/Artist";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import { Painting } from "@/types/Painting";
import { useAppDispatch } from "@/types/ReduxHooks";
import { getAllPaintingsByArtist, getProfile } from "@/utils/api";
import {
  Authenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import ArtistInfo from "../artists/[slug]/artistInfo/artistInfo";
import ArtistTabs from "../artists/[slug]/artistTabs/artistTabs";
import CreatePainting from "../components/createPainting/createPainting";
import EditProfile from "../components/editProfile/editProfile";
import Loading from "../loading";
import {
  resetArtistGalleryPageCount,
  setArtistId,
  setArtistPaintings,
} from "../redux/slices/artistPaintingsSlice";

import { authenticatorStylesComponents } from "./aws-authenticator-styles/aws-authenticator-styles";
import style from "./page.module.scss";

const Profile = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Artist | null>(null);
  const [openForm, setOpenForm] = useState<ArtistTabOptions | null>(null);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = user
        .getSignInUserSession()
        ?.getAccessToken()
        .getJwtToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const fetchedAuthor = await getProfile(headers);
      setAuthor(fetchedAuthor);
      setIsFetching(false);

      const paintingsData = await getAllPaintingsByArtist(headers);

      // setPaintings(paintingsData);
      dispatch(resetArtistGalleryPageCount());
      dispatch(setArtistPaintings(paintingsData));
      setIsFetching(false);
    };

    if (user?.username) {
      fetchData();
    }

    setIsFetching(false);
  }, [user, dispatch]);

  useEffect(() => {
    if (author) {
      dispatch(setArtistId(author.prettyId));
    }
  }, [author, dispatch]);

  return (
    <section className={style.profile}>
      {isFetching ? (
        <Loading />
      ) : (
        <Authenticator
          className={style.auth}
          components={authenticatorStylesComponents}
        >
          {!openForm && author && (
            <>
              <ArtistInfo
                isProfile
                artistInfo={author}
                setOpenForm={setOpenForm}
              />
              <ArtistTabs setOpenForm={setOpenForm} />
            </>
          )}
          {(openForm === ArtistTabOptions.profile || !author) && (
            <EditProfile
              author={author}
              setAuthor={setAuthor}
              setOpenForm={setOpenForm}
            />
          )}
          {openForm === ArtistTabOptions.artworks && (
            <CreatePainting
              setPaintings={setPaintings}
              setOpenForm={setOpenForm}
            />
          )}
        </Authenticator>
      )}
    </section>
  );
};

export default Profile;
