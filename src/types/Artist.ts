export interface Artist {
  aboutMe: string;
  city: string;
  id: string;
  cognitoSubject: string;
  country: string;
  fullName: string;
  imageUrl: string;
  prettyId: string;
  styles: string[];
  imagePublicId: string;
  isDeactivated: boolean;
}

export interface ArtistsCollection {
  total: number;
  content: Artist[];
}
