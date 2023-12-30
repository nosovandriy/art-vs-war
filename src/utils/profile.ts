import {
  RekognitionClient,
  DetectModerationLabelsCommand,
} from "@aws-sdk/client-rekognition";

import { ImageData, UserData } from "@/types/Profile";
import { ModerationStatus, PaintingData } from "@/types/Painting";
import { createFolder, getSignature, sendModerationEmail, uploadImage, validateData } from "./api";

const upload_preset = process.env.NEXT_APP_CLOUDINARY_UPLOAD_PRESET;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.NEXT_APP_CLOUDINARY_API_KEY;
const KEY = process.env.NEXT_APP_AWS_KEY!;
const SECRETKEY = process.env.NEXT_APP_AWS_SECRET_KEY!;
const REGION = process.env.NEXT_APP_AWS_REGION!;

export const refreshAccessToken = (refreshToken: any, user: any) => {
  if (refreshToken) {
    user.refreshSession(refreshToken, (err: any, session: any) => {});
  }
};

export const validateDataOnServer = async (
  data: UserData | PaintingData,
  url: string,
  headers: HeadersInit,
  email: string = '',
): Promise<any> => {
  const getUserData = (user: UserData) => ({ ...user, email });
  const getPaintingData = (painting: PaintingData) => {
    const paintingToValidate = {
      ...painting,
    };

    delete paintingToValidate.image;

    return paintingToValidate;
  };

  const dataToValidate = url.includes('paintings')
    ? getPaintingData(data as PaintingData)
    : getUserData(data as UserData);

  try {
    const { folder } = await validateData(url, dataToValidate, headers);

    return folder;
  } catch {
    return;
  }
}

export const getSignatureFromServer = async (
  data: UserData | PaintingData,
  url: string,
  headers: HeadersInit,
  email: string = '',
): Promise<any> => {
  const folder = await validateDataOnServer(data, url, headers, email);

  try {
    if (!upload_preset) {
      return;
    }

    const requestParams = {
      upload_preset,
      folder,
    };

    const { signature, timestamp } = await getSignature(requestParams, headers);

    return {
      signature,
      timestamp,
      folder,
    };
  } catch {
    return;
  }
};

export const moderateImage = async (file: File) => {
  const client = new RekognitionClient({
    region: REGION,
    credentials: {
      accessKeyId: KEY,
      secretAccessKey: SECRETKEY,
    }
  });

  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  const input = {
    Image: {
      Bytes: uint8Array,
    },
  }

  const command = new DetectModerationLabelsCommand(input);

  try {
    const data = await client.send(command);

    return data;
  } catch (error) {
    console.log(error)
  }
};

export const uploadImageToServer = async (
    data: UserData | PaintingData,
    url: string,
    headers: HeadersInit,
    moderationStatus: ModerationStatus,
    email: string = '',
  ): Promise<any> => {
  if (
      data.image
      && upload_preset
      && cloudinaryApiKey
      && cloudName
      && data.image instanceof File
    ) {

    const { signature, timestamp, folder } = await getSignatureFromServer(data, url, headers, email);
    const formData = new FormData();

    formData.append("file", data.image);
    formData.append("folder", folder);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("upload_preset", upload_preset);
    formData.append("api_key", cloudinaryApiKey);

    try {
      const {
        public_id,
        version,
        signature,
        width,
        height,
      } = await uploadImage(formData, cloudName);

      const imageData: ImageData = {
        version,
        signature,
        publicId: public_id,
        moderationStatus,
        width,
        height,
      }

      return imageData;

    } catch {
      return;
    }
  }
};

export const uploadAdditionalImages = async (
  images: File[],
  headers: { Authorization?: string },
  paintingId: number,
  moderationStatuses: { moderation: ModerationStatus, ModerationLabels: any}[],
) => {
  if (!upload_preset || !cloudinaryApiKey || !cloudName) return [];

  const folder = await createFolder(headers, paintingId);

  const requestParams = {
    upload_preset,
    folder,
  };

  const uploadedData = [];

  for (let i = 0; i <= images.length; i++) {
    if (images[i]) {
      const { signature, timestamp } = await getSignature(requestParams, headers);

      const formData = new FormData();
      formData.append('file', images[i]);
      formData.append('folder', folder);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('upload_preset', upload_preset);
      formData.append('api_key', cloudinaryApiKey);

      try {
        const {
          public_id,
          version,
          signature,
        } = await uploadImage(formData, cloudName);

        if (moderationStatuses[i].moderation === 'PENDING') {
          await sendModerationEmail({
            publicId: public_id,
            message: moderationStatuses[i].ModerationLabels,
          });
        };

        const imageData = {
          version,
          signature,
          publicId: public_id,
          moderationStatus: moderationStatuses[i].moderation,
        };

        uploadedData.push(imageData);
      } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        return [];
      }
    }
  }

  return uploadedData;
};
