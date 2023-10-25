"use client"

import { useEffect, useState } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import style from "../page.module.scss";

import EditProfile from "./profile-form/editProfile";
import createHeaders from "@/utils/getAccessToken";
import { getProfile } from "@/utils/api";
import { Artist } from "@/types/Artist";
import Loading from "@/app/loading";
import { authenticatorStylesComponents } from "../aws-authenticator-styles/aws-authenticator-styles";

const EditProfilePage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Artist | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const headers = createHeaders(user);

      const fetchedAuthor = await getProfile(headers);
      setAuthor(fetchedAuthor);
      setIsFetching(false);
    };

    if (user?.username) {
      fetchData();
    }

  }, [user]);

return (
  <Authenticator
    className={style.auth}
    components={authenticatorStylesComponents}
  >
    {isFetching
      ? <Loading />
      : (
      <EditProfile
        author={author}
        setAuthor={setAuthor}
      />
     )}
  </Authenticator>
  );
};

export default EditProfilePage
