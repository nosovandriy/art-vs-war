interface User {
  getSignInUserSession(): any;
}

const createHeaders = (user: User | null): { Authorization?: string } => {
  const accessToken = user
    ?.getSignInUserSession()
    ?.getAccessToken()
    ?.getJwtToken();

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return {};
  }
};

export default createHeaders;
