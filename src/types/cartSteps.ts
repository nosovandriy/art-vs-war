export enum CartSteps {
  firstStep = "cart",
  secondStep = "shipping",
}

export enum ImageValidationCartSteps {
  firstStep = "rejected",
  secondStep = "pending",
}

export interface DataImage {
  publicId: string;
  status: string;
}