export const updatePrice = (
  params: URLSearchParams,
  priceRanges: number[],
  minPrice: number,
  maxPrice: number,
  setPriceRanges: (price: number[]) => void
) => {
  if (priceRanges[0] !== minPrice || priceRanges[1] !== maxPrice) {
    const newPriceRanges = [...priceRanges];

    if (
      newPriceRanges[0] < minPrice ||
      newPriceRanges[0] > priceRanges[1] ||
      newPriceRanges[0] > maxPrice
    ) {
      newPriceRanges[0] = minPrice;
    }

    if (
      newPriceRanges[1] > maxPrice ||
      newPriceRanges[1] < priceRanges[0] ||
      newPriceRanges[1] < minPrice
    ) {
      newPriceRanges[1] = maxPrice;
    }

    setPriceRanges(newPriceRanges);

    params.set("priceBetween", newPriceRanges.join(","));
  } else {
    params.delete("priceBetween");
  }
};

export const updateStyles = (
  paramName: string,
  checkOptions: string[],
  params: URLSearchParams
) => {
  if (checkOptions.length) {
    params.set(paramName, checkOptions.join(","));
  } else {
    params.delete(paramName);
  }
};

export const updateSize = (
  params: URLSearchParams,
  paramName: string,
  sizeRanges: number[],
  minSize: number,
  maxSize: number
) => {
  if (sizeRanges[0] !== minSize || sizeRanges[1] !== maxSize) {
    params.set(paramName, sizeRanges.join(","));
  } else {
    params.delete(paramName);
  }
};

export const updateStatus = (
  params: URLSearchParams,
  paramName: string,
  paymentStatus: string
) => {
  if (paymentStatus) {
    params.set(paramName, paymentStatus);
  } else {
    params.delete(paramName);
  }
};

export const removeAllSearchParameters = (params: URLSearchParams) => {
  const allSearchParams = [
    "paymentStatus",
    "priceBetween",
    "styleIn",
    "subjectIn",
    "mediumIn",
    "supportIn",
    "widthBetween",
    "heightBetween",
  ];

  allSearchParams.forEach((param) => params.delete(param));
};
