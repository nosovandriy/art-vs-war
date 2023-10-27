"use client"

import { useEffect, useState } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import style from "../page.module.scss";

import { UploadedPaintingData } from "@/types/Painting";
import CreatePainting from "./painting-form/createPainting";
import AdditionalInfo from "@/app/components/additional-info/additional-info";
import { checkStatus } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import Loading from "@/app/loading";
import { Statuses } from "@/types/Profile";

const CreatePaintingPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [isNextStepVisible, setIsNextStepVisible] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedPaintingData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [statuses, setStatuses] = useState<Statuses | null>(null);

useEffect(() => {
  const fetchData = async () => {
  const headers = createHeaders(user);
  const fetchedStatuses = await checkStatus(headers);

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
        />
    )}
  </Authenticator>
  );
};

export default CreatePaintingPage
