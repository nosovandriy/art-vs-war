"use client";

import {
  Authenticator,
  Button,
  Heading,
  Text,
  View,
  useAuthenticator,
  useTheme,
} from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

import { Artist } from "@/types/Artist";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import { useAppDispatch } from "@/types/ReduxHooks";
import { getAllPaintingsByArtist, getProfile } from "@/utils/api";
import ArtistInfo from "../artists/[slug]/artistInfo/artistInfo";
import ArtistTabs from "../artists/[slug]/artistTabs/artistTabs";
import EditProfile from "../components/editProfile/editProfile";
import Loading from "../loading";
import {
  resetArtistGalleryPageCount,
  setArtistId,
  setArtistPaintings,
} from "../redux/slices/artistPaintingsSlice";

import style from "./page.module.scss";
import { authenticatorStylesComponents } from "./aws-authenticator-styles/aws-authenticator-styles";
import createHeaders from "@/utils/getAccessToken";

const Profile = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Artist | null>(null);
  const [openForm, setOpenForm] = useState<ArtistTabOptions | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsFetching(true);

    const fetchData = async () => {
      const headers = createHeaders(user);
      const fetchedAuthor = await getProfile(headers);

      setAuthor(fetchedAuthor);

      const paintingsData = await getAllPaintingsByArtist(headers);

      dispatch(resetArtistGalleryPageCount());
      dispatch(setArtistPaintings(paintingsData));

      // const response = await axios.get('https://www.albedosunrise.com/paintings/additionalImages/68', { headers });
      // console.log(response);
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
          {author ? (
            <>
              <ArtistInfo isProfile artistInfo={author} signOut={signOut} />
              <ArtistTabs setOpenForm={setOpenForm} />
            </>
          ) : (
            <EditProfile author={author} setAuthor={setAuthor} />
          )}
        </Authenticator>
      )}
    </section>
  );
};

export default Profile;
