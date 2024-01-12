export const getPageName = (inputString: string) => {
  const words = inputString.split('/');
  const pageNAme = words[words.length - 1];

  return pageNAme;
};
