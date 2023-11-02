"use client"

import { useEffect, useState } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import style from "../page.module.scss";

import { UploadedPaintingData } from "@/types/Painting";
import CreatePainting from "./painting-form/createPainting";
import AdditionalInfo from "@/app/components/additional-info/additional-info";
import { checkStatus, getPainting, getProfilePainting } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import Loading from "@/app/loading";
import { Statuses } from "@/types/Profile";
import { useParams, usePathname, useRouter } from "next/navigation";

const CreatePaintingPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [isNextStepVisible, setIsNextStepVisible] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedPaintingData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [statuses, setStatuses] = useState<Statuses | null>(null);
  const [painting, setPainting] = useState<UploadedPaintingData | null>(null);

  const params = useParams();
  const pathName = usePathname();

  useEffect(() => {
    const fetchData = async () => {
    const headers = createHeaders(user);
    const fetchedStatuses = await checkStatus(headers);

    if (typeof params.slug === 'string' && pathName.includes(params.slug)) {
      const fetched = await getProfilePainting(params.slug, headers);

      setPainting(fetched);
    }

    setStatuses(fetchedStatuses);
    setIsFetching(false);
    };

    if (user?.username) {
    fetchData();
    }
  }, []);

  return (
    <Authenticator className={style.auth}>
      {isFetching && <Loading />}
      {(isNextStepVisible && uploaded)
        ? <AdditionalInfo uploaded={uploaded} />
        : (
          <CreatePainting
            setNextStep={setIsNextStepVisible}
            setUploaded={setUploaded}
            statuses={statuses}
            initial={painting || null}
          />
      )}
    </Authenticator>
  );
};

export default CreatePaintingPage
