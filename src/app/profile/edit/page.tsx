"use client"

import { useEffect, useState } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import style from "../page.module.scss";

import EditProfile from "@/app/components/editProfile/editProfile";
import { getProfile } from "@/utils/api";
import { Artist } from "@/types/Artist";

const EditProfilePage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Artist | null>(null);

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
    };

    if (user?.username) {
      fetchData();
    }

  }, [user]);

return (
  <Authenticator className={style.auth}>
    <EditProfile
      author={author}
      setAuthor={setAuthor}
    />
  </Authenticator>
  );
};

export default EditProfilePage