"use client"

import { useEffect, useState } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import style from "../page.module.scss";

import { UploadedPaintingData } from "@/types/Painting";
import CreatePainting from "./painting-form/createPainting";
import AdditionalInfo from "@/app/components/additional-info/additional-info";
import { getProfilePainting } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import Loading from "@/app/loading";
import { useParams, usePathname } from "next/navigation";
import { authenticatorStylesComponents } from "../aws-authenticator-styles/aws-authenticator-styles";

const CreatePaintingPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [isNextStepVisible, setIsNextStepVisible] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedPaintingData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [painting, setPainting] = useState<UploadedPaintingData | null>(null);

  const params = useParams();
  const pathName = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const headers = createHeaders(user);

      if (typeof params.slug === 'string' && pathName.includes(params.slug)) {
        const fetched = await getProfilePainting(params.slug, headers);

        setPainting(fetched);
      }
    };

    if (user?.username) {
    fetchData();
    }

    setIsFetching(false);
  }, []);

  return (
    <Authenticator
      className={style.auth}
      components={authenticatorStylesComponents}
    >
      {isFetching && <Loading />}
      {(isNextStepVisible && uploaded)
        ? <AdditionalInfo uploaded={uploaded} />
        : (
          <CreatePainting
            setNextStep={setIsNextStepVisible}
            setUploaded={setUploaded}
            initial={painting || null}
          />
      )}
    </Authenticator>
  );
};

export default CreatePaintingPage
