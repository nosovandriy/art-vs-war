"use client"

import { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";

import style from "../page.module.scss";

import { UploadedPaintingData } from "@/types/Painting";
import CreatePainting from "./painting-form/createPainting";
import AdditionalInfo from "@/app/components/additional-info/additional-info";

const EditProfilePage = () => {
  const [isNextStepVisible, setIsNextStepVisible] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedPaintingData | null>(null);

return (
  <Authenticator className={style.auth}>
    {(isNextStepVisible && uploaded)
      ? <AdditionalInfo uploaded={uploaded} />
      : (
        <CreatePainting
          setNextStep={setIsNextStepVisible}
          setUploaded={setUploaded}
        />
    )}
  </Authenticator>
  );
};

export default EditProfilePage
