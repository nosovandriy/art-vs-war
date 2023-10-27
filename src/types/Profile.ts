import { JwtPayload } from "jwt-decode";

export type Action = 'create' | 'update';
export type CustomJwtPayload = JwtPayload & { email: string };

export interface Headers {
  Authorization?: string | undefined;
}

export interface ProfileForm {
  fullName: string;
  country: string;
  city: string;
  aboutMe: string;
  image: FileList | [];
}

export interface UserData {
  fullName: string;
  country: string;
  city: string;
  aboutMe: string;
  image?: File;
}

export interface UserDataToSave {
  fullName: string;
  city: string;
  country: string;
  aboutMe: string;
  email: string;
  image: File | { publicId: string };
}

export interface ImageData {
  publicId: string;
  version: number;
  signature: string;
  moderationStatus: string;
  width?: number;
  height?: number;
}

export interface RequestParams {
  upload_preset: string;
  folder: string;
}

export interface AuthorData {
  country: string,
  fullName: string,
  id: string,
  prettyId: string,
}

export interface Statuses {
  hasAddress: boolean,
  hasStripeProfile: boolean,
};
