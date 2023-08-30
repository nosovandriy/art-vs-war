"use client"

import { Authenticator } from "@aws-amplify/ui-react";

import style from "../page.module.scss";

import CreatePainting from "@/app/components/createPainting/createPainting";
import { useState } from "react";
import AdditionalInfo from "@/app/components/additional-info/additional-info";
import { UploadedPaintingData } from "@/types/Painting";

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