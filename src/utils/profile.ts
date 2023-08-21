import { ImageData, UserData } from "@/types/Profile";
import { PaintingData } from "@/types/Painting";
import { getSignature, uploadImage, validateData } from "./api";

const upload_preset = process.env.NEXT_APP_CLOUDINARY_UPLOAD_PRESET;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.NEXT_APP_CLOUDINARY_API_KEY;

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

export const uploadImageToServer = async (
    data: UserData | PaintingData,
    url: string,
    headers: HeadersInit,
    email: string = '',
  ): Promise<any> => {
  if (data.image
    && upload_preset
    && cloudinaryApiKey
    && cloudName) {
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
        moderationStatus: 'APPROVED',
        width,
        height,
      }

      return imageData;

    } catch {
      return;
    }
  }
};