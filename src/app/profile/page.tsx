"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { authenticatorStylesComponents } from "./aws-authenticator-styles/aws-authenticator-styles";

import style from "./page.module.scss";

import {
  resetArtistGalleryPageCount,
  setArtistId,
  setArtistPaintings,
} from "../redux/slices/artistPaintingsSlice";
import Loading from "../loading";
import { Artist } from "@/types/Artist";
import createHeaders from "@/utils/getAccessToken";
import { useAppDispatch } from "@/types/ReduxHooks";
import { getUserRole } from "@/utils/account";
import ArtistInfo from "../artists/[slug]/artistInfo/artistInfo";
import ArtistTabs from "../artists/[slug]/artistTabs/artistTabs";
import EditProfile from "./edit/assets/editProfile";
import { getAllPaintingsByArtist, getProfile } from "@/utils/api";

const Profile = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Artist | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsFetching(true);
    const hasCustomerRole = getUserRole(user, 'ROLE_CUSTOMER');
    const hasAuthorRole = getUserRole(user, 'ROLE_AUTHOR');

    if (!hasCustomerRole) {
      router.replace('/account');

      return;
    };

    if (!hasAuthorRole) {
      setAuthor(null);
      setIsFetching(false);

      return;
    }

    const fetchData = async () => {
      const headers = createHeaders(user);
      const fetchedAuthor = await getProfile(headers);

      setAuthor(fetchedAuthor);

      const paintingsData = await getAllPaintingsByArtist(headers);

      dispatch(resetArtistGalleryPageCount());
      dispatch(setArtistPaintings(paintingsData));
    };

    if (user?.username) {
      fetchData();
    }

    setIsFetching(false);

    return setIsFetching(false);
  }, [user]);

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
          {(author && !isFetching)
            ? (
              <>
                <ArtistInfo isProfile artistInfo={author} signOut={signOut} />
                <ArtistTabs />
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
