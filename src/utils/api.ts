import axios from 'axios';
import { notFound } from 'next/navigation';

import { ArtProcessData, ModerationData, PaintingData } from '@/types/Painting';
import { Headers, ImageData, RequestParams, UserData, UserDataToSave } from '@/types/Profile';
import {
  AuthorShippingFormData,
  AuthorShippingResponseData,
  MessageFormTypes,
  ShippingFormTypes,
  ShippingInfo,
  ShippingResponseData,
} from '@/types/ShippingForm';
import { AccountData } from '@/types/Account';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getHeroPaintings() {
  const response = await fetch(`${BASE_URL}paintings/mainPage`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getGeneralProjectData() {
  const response = await fetch(`${BASE_URL}mainPage/data`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getPaintings(params: string = '') {
  const response = await fetch(`${BASE_URL}paintings/search?${params}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getFiltersData() {
  const response = await fetch(`${BASE_URL}paintings/params`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getPainting(id: string) {
  const response = await fetch(`${BASE_URL}paintings/v2/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  return data;
}

export async function getProfilePainting(id: string, headers: HeadersInit) {
  const response = await fetch(`${BASE_URL}paintings/profile/${id}`, {
    cache: 'no-store',
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  return data;
}

export async function getArtists(params: string = '') {
  const response = await fetch(`${BASE_URL}authors${params}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getArtist(id: string) {
  const response = await fetch(`${BASE_URL}authors/v2/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  return data;
}

export async function getPaintingsByArtist(id: string, page: number = 0) {
  const response = await fetch(`${BASE_URL}paintings/author/${id}?page=${page}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getArtProcess(id: string = '', headers?: HeadersInit) {
  const response = await fetch(`${BASE_URL}artProcess/all/${id}`, {
    cache: 'no-store',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function deleteArtProcessItem(id: string, headers?: HeadersInit) {
  const response = await fetch(`${BASE_URL}artProcess?id=${id}`, {
    method: 'DELETE',
    cache: 'no-store',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  } else {
    return response;
  }
}

export async function getMorePaintings(id: string, size: number) {
  const response = await fetch(
    `${BASE_URL}paintings/additional?paintingPrettyId=${id}&size=${size}`,
    { cache: 'no-store' },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getMightLikePaintings(id: string, size: number) {
  const response = await fetch(`${BASE_URL}paintings/recommend?prettyIds=${id}&size=${size}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getAllPaintingsByArtist(headers: HeadersInit) {
  const response = await fetch(`${BASE_URL}paintings/author/all?&page=0`, {
    cache: 'no-store',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getProfile(headers: object) {
  const { data } = await axios.get(BASE_URL + 'authors/profile', { headers });

  return data;
}

export async function validateData(
  url: string,
  inputsData: UserData | PaintingData | ArtProcessData,
  headers: HeadersInit,
) {
  const response = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(inputsData),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function getSignature(requestParams: RequestParams, headers: HeadersInit) {
  const response = await fetch(BASE_URL + 'images/getSignature', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(requestParams),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function createArtProcess(artProcess: any, headers: object) {
  const { data } = await axios.post(`${BASE_URL}artProcess`, artProcess, {
    headers,
  });

  return data;
}

export async function createFolder(headers: HeadersInit, paintingId: number) {
  const response = await fetch(BASE_URL + `additionalPaintingImage/folder/${paintingId}`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const { folder } = await response.json();

  return folder;
}

export async function uploadImage(formData: FormData, cloudName: string) {
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return data;
}

export async function saveAdditionalPhotos(
  images: ImageData[],
  headers: { Authorization?: string },
  paintingId: number,
) {
  const { data } = await axios.post(BASE_URL + `additionalPaintingImage/${paintingId}`, images, {
    headers,
  });

  return data;
}

export async function getAdditionalImages(headers: { Authorization?: string }, paintingId: string) {
  const { data } = await axios.get(BASE_URL + `paintings/additionalImages/${paintingId}`, {
    headers,
  });

  return data;
}

export async function deleteAdditionalImages(
  headers: { Authorization?: string },
  paintingId: number,
) {
  const { data } = await axios.delete(BASE_URL + `additionalPaintingImage/${paintingId}`, {
    headers,
  });

  return data;
}

export async function createProfile(userData: UserDataToSave, headers: object) {
  const { data } = await axios.post(BASE_URL + 'authors/', userData, {
    headers,
  });

  return data;
}

export async function updateProfile(userData: UserDataToSave, headers: object) {
  const { data } = await axios.put(BASE_URL + 'authors/', userData, {
    headers,
  });

  return data;
}

export async function saveOrderPaintingToServer(id: number, headers: object) {
  const { data } = await axios.post(
    `${BASE_URL}cart/${id}`,
    {},
    {
      headers,
    },
  );

  return data;
}

export async function saveOrderPaintingsToServer(ids: string, headers: object) {
  const { data } = await axios.post(
    `${BASE_URL}cart?paintingIds=${ids}`,
    {},
    {
      headers,
    },
  );

  return data;
}

export async function removeOrderPaintingFromServer(id: number, headers: object) {
  const { data } = await axios.delete(`${BASE_URL}cart/${id}`, {
    headers,
  });

  return data;
}

export async function getOrderDataFromServer(headers: object) {
  const { data } = await axios.get(`${BASE_URL}cart`, {
    headers,
  });

  return data;
}

export async function getShippingInfo(
  ids: string,
  shippingFormData: ShippingFormTypes,
  headers: object,
) {
  const response = await fetch(`${BASE_URL}shipping/getRates?paintingIds=${ids}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(shippingFormData),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}

export async function sendContactUsMessage(message: MessageFormTypes) {
  const response = await fetch(`${BASE_URL}email/contactUs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(message),
  });

  if (response.ok) {
    return 'Email has been sent';
  }
}

export async function getStripeLink(ids: string, shippingFormData: ShippingInfo, headers: object) {
  const response = await axios.post(
    `${BASE_URL}stripe/checkout?paintingIds=${ids}`,
    shippingFormData,
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json;charset=utf-8',
      },
    },
  );

  return response.data;
}

export async function getActivateStripe(headers: object) {
  const response = await axios.get(`${BASE_URL}stripe/onboarding`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return response.data;
}

export async function checkStripeAccount(headers: object) {
  const response = await axios.get(`${BASE_URL}stripeAccount/check`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return response.data;
}

export async function balanceStripeAccount(headers: object) {
  const response = await axios.get(`${BASE_URL}stripe`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return response.data;
}

export async function getStripeDashboard(headers: object) {
  const response = await axios.get(`${BASE_URL}stripe/dashboard`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return response.data;
}

export async function getRecentlySoldPaintings(headers: object) {
  const response = await axios.get(`${BASE_URL}paintings/recentSelling`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return response.data;
}

export async function getAccount(headers: Headers) {
  const { data } = await axios.get(`${BASE_URL}account`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function createAccount(headers: Headers, accountData: AccountData) {
  const { data } = await axios.post(`${BASE_URL}account`, accountData, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function updateAccount(headers: Headers, accountData: AccountData) {
  const { data } = await axios.put(`${BASE_URL}account`, accountData, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function getAddress(headers: Headers) {
  const { data } = await axios.get(`${BASE_URL}account/addresses`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data as ShippingResponseData[];
}

export async function saveAddress(headers: Headers, accountData: ShippingFormTypes) {
  const { data } = await axios.post(`${BASE_URL}account/addresses`, [accountData], {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function checkStatus(headers: Headers) {
  const { data } = await axios.get(`${BASE_URL}authors/check`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function getAuthorPaintingById(headers: Headers, id: string) {
  const { data } = await axios.get(`${BASE_URL}paintings/profile/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function updatePaintingById(headers: Headers, id: string) {
  const { data } = await axios.post(`${BASE_URL}paintings/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function deletePaintingById(headers: Headers, id: string) {
  const { data } = await axios.delete(`${BASE_URL}paintings/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function emailUnsubscribe(unsubscribe: any, headers: object) {
  const response = await fetch(`${BASE_URL}account/unsubscribe`, {
    method: 'PATCH',
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(unsubscribe),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response;
}

export async function getShippingAddress(headers: Headers) {
  const { data } = await axios.get(`${BASE_URL}address/author`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data as AuthorShippingResponseData;
}

export async function saveShippingAddress(
  headers: Headers,
  shippingAddress: AuthorShippingFormData,
) {
  const { data } = await axios.post(`${BASE_URL}address/author`, shippingAddress, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data as AuthorShippingResponseData;
}

export async function updateShippingAddress(
  headers: Headers,
  shippingAddress: AuthorShippingFormData,
) {
  const { data } = await axios.put(`${BASE_URL}address/author`, shippingAddress, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data as AuthorShippingResponseData;
}

export async function getOrders(headers: Headers) {
  const { data } = await axios.get(`${BASE_URL}orders/all`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data.content;
}

export async function getOrderById(headers: Headers, id: number) {
  const { data } = await axios.get(`${BASE_URL}orders/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function setOrderDelivered(headers: Headers, id: number) {
  const { data } = await axios.patch(`${BASE_URL}orders/delivered/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return data;
}

export async function getRejectedImagesList(headers: HeadersInit) {
  const response = await fetch(`${BASE_URL}images/rejectedAssets`, {
    cache: 'no-store',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function rejectNotValidImage(headers: HeadersInit, publicId: string) {
  const url = `${BASE_URL}images/setRejected?publicId=${publicId}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  const data = await response.text();
  return data;
}

export async function sendModerationEmail(moderationData: ModerationData) {
  await axios.post(`${BASE_URL}email/moderation`, moderationData);
}
