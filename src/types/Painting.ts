import { ImageData } from "./Profile";

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
  width: number;
  height: number;
  depth: number;
}

export interface UploadedPainting {
  id: number;
  title: string;
  price: number;
  prettyId: string;
  imageUrl: string;
  authorFullName: string;
  authorPrettyId: string;
  authorCountry: string;
  width: number;
  height: number;
  depth: number;
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

export type PaintingForm = {
  image: FileList;
  yearOfCreation: number;
  title: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  price: number;
  styleIds: number[];
  mediumIds: number[];
  supportIds: number[];
  subjectIds: number[];
  description: string;
};

export type PaintingData = {
  image?: File;
  yearOfCreation: number;
  title: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  price: number;
  styleIds: number[];
  mediumIds: number[];
  supportIds: number[];
  subjectIds: number[];
  description: string;
};

export type PaintingDataToSave = {
  image: ImageData;
  yearOfCreation: number;
  title: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  price: number;
  styleIds: number[];
  mediumIds: number[];
  supportIds: number[];
  subjectIds: number[];
  description: string;
};
