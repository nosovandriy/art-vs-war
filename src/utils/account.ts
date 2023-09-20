export const getAddressPieces = (piece: { terms: {value: string}[] }) => {
  const length = piece.terms.length;

  switch (length) {
    case 0:
      return [''];

    case 1:
      return ['', piece.terms[0].value]

    case 2:
      return [piece.terms[0].value, piece.terms[1].value];

    case 3:
      return [piece.terms[1].value, piece.terms[2].value];

    case 4:
      return [piece.terms[2].value, piece.terms[3].value];

    default: return ['', ''];
  }
};
