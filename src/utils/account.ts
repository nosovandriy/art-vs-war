import jwt_decode from "jwt-decode";
import { AmplifyUser } from "@aws-amplify/ui";

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

export const getUserRole = (user: any, role: string) => {
  if (!user) return;

  const token =user
    ?.getSignInUserSession()
    ?.getAccessToken()
    ?.getJwtToken();

  const decoded: any = token && jwt_decode(token)
  const roles = 'cognito:groups';
  const hasUserRoles = decoded.hasOwnProperty(roles);
  const hasRole = hasUserRoles && decoded[roles].includes(role);

  return hasRole;
}

export function getRegistrationLink(user: AmplifyUser) {
  const hasCustomerRole = getUserRole(user, "ROLE_CUSTOMER");
  const hasAuthorRole = getUserRole(user, "ROLE_AUTHOR");

  if (!user || !hasCustomerRole) {
    return "/account";
  } else if (!hasAuthorRole) {
    return "/profile";
  } else {
    return "/account";
  }
}

export const getPlaceDetails = (placeId: string): Promise<{ postalCode: string | undefined, state: string | undefined, city: string | undefined }> => {
  return new Promise((resolve) => {
    const service = new google.maps.places.PlacesService(document.createElement("div"));

    service.getDetails(
      {
        placeId,
        fields: ["address_component", "name"],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const postalCode = place?.address_components?.find(
            (component) => component.types.includes("postal_code")
          )?.long_name;
          const state = place?.address_components?.find(
            (component) => component.types.includes("administrative_area_level_1")
          )?.long_name;

          // Prioritize locality for city information
          const city = place?.address_components?.find(
            (component) => component.types.includes("locality")
          )?.long_name || place?.name;

          resolve({ postalCode, state, city });
        } else {
          console.error("Error fetching place details:", status);
          resolve({ postalCode: undefined, state: undefined, city: undefined });
        }
      }
    );
  });
};
