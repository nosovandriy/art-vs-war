"use client"

import { useEffect, useState } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import style from "../page.module.scss";

import EditProfile from "@/app/components/editProfile/editProfile";
import createHeaders from "@/utils/getAccessToken";
import { getProfile } from "@/utils/api";
import { Artist } from "@/types/Artist";

const EditProfilePage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Artist | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const headers = createHeaders(user);

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
