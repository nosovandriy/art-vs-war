import { AuthorData, ImageData } from './Profile';

export interface Painting {
  id: number;
  title: string;
  price: number;
  prettyId: string;
  imageUrl: string;
  authorFullName: string;
  authorPrettyId: string;
  authorCountry?: string;
  paymentStatus?: string;
  yearOfCreation: number;
  width: number;
  height: number;
  depth: number;
}

export interface ArtProcess {
  id: number;
  description: string;
  imagePublicId: number;
  imageUrl: string;
  imageModerationStatus: string;
  imageWidth: number;
  imageHeight: number;
}

export interface ArtCollection {
  content: Painting[];
  total: number;
  artistId: string;
}

export interface PaintingFilterParams {
  minPrice: number;
  maxPrice: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  styles: string[];
  mediums: string[];
  supports: string[];
  subjects: string[];
}

export interface UploadedPainting extends Painting {
  authorCountry: string;
}

export interface PaintingData extends Painting {
  image?: FileList | { publicId: string } | ImageData;
}

export interface ArtProcessData {
  image?: File;
  description: string;
}

export interface PaintingForm extends Painting {
  image: FileList | { publicId: string };
  weight: number;
  styleIds: number[];
  mediumIds: number[];
  supportIds: number[];
  subjectIds: number[];
  description: string;
  yearOfCreation: number;
}

export interface PaintingDataToSave extends Painting {
  image: ImageData | { publicId: string };
}

export interface ResponseImage {
  imageModerationStatus: string;
  imagePublicId: string;
  imageUrl: string;
  views?: string[];
  id?: number;
}

export interface UploadedPaintingData {
  id: number;
  prettyId: string;
  image: ResponseImage;
  author: AuthorData;
  collection: object;
  yearOfCreation: number;
  title: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  price: number;
  styles: { id: number, value: string }[];
  mediums: { id: number, value: string }[];
  supports: { id: number, value: string }[];
  subjects: { id: number, value: string }[];
  addedToDataBase: { addedToDataBase: string };
  description: string;
  paymentStatus: string;
}

export interface OrderPainting extends Painting {
  imageId: string;
}

export type ModerationStatus = 'APPROVED' | 'PENDING';

export interface ModerationData {
  publicId: string;
  message: string;
}
