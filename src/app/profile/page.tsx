"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { authenticatorStylesComponents } from "./aws-authenticator-styles/aws-authenticator-styles";

import style from "./page.module.scss";

import {
  resetArtistGalleryPageCount,
  setArtProcessImages,
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

import {
  checkStatus,
  getAllPaintingsByArtist,
  getArtProcess,
  getProfile,
} from "@/utils/api";
import { Statuses } from "@/types/Profile";
import EditProfile from "./edit-profile/profile-form/editProfile";

const Profile = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Artist | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [statuses, setStatuses] = useState<Statuses | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const hasCustomerRole = getUserRole(user, "ROLE_CUSTOMER");
    const hasAuthorRole = getUserRole(user, "ROLE_AUTHOR");

    if (!isFetching && !hasCustomerRole) {
      router.replace("/account");

      return;
    }

    if (!isFetching && !hasAuthorRole) {
      setAuthor(null);

      return;
    }

    const fetchData = async () => {
      const headers = createHeaders(user);
      const fetchedAuthor = await getProfile(headers);

      setAuthor(fetchedAuthor);
      setIsFetching(false);

      const paintingsData = await getAllPaintingsByArtist(headers);

      dispatch(resetArtistGalleryPageCount());
      dispatch(setArtistPaintings(paintingsData));
      setIsFetching(false);
    };

    const fetchArtProcessData = async () => {
      const userHeaders = hasAuthorRole ? createHeaders(user) : {};

      const artProcessImages = await getArtProcess("", userHeaders);
      dispatch(setArtProcessImages(artProcessImages));
    };

    const fetchStatuses = async () => {
      const headers = createHeaders(user);
      const fetchedStatuses = await checkStatus(headers);

      setStatuses(fetchedStatuses);
      setIsFetching(false);
    };

    if (user?.username) {
      fetchData();
      fetchStatuses();
      fetchArtProcessData();
    }
  }, [user, router]);

  useEffect(() => {
    if (author) {
      dispatch(setArtistId(author.prettyId));
    }
  }, [author, dispatch]);

  return (
    <section className={style.profile}>
      <Authenticator
        className={style.auth}
        components={authenticatorStylesComponents}
      >
        {isFetching && <Loading />}

        {author ? (
          <>
            <ArtistInfo
              isProfile
              statuses={statuses}
              artistInfo={author}
            />
            <ArtistTabs />
          </>
        ) : (
          <EditProfile author={author} setAuthor={setAuthor} />
        )}
      </Authenticator>
    </section>
  );
};

export default Profile;
