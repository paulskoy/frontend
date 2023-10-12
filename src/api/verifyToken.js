// manage the access token if the token is expire remove
export const checkAccessToken = async (token) => {
  // fetch from the endpoint
  const res = await fetch(
    `${import.meta.env.VITE_REACT_BASE_API}login/verifyaccesstoken`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();
  return data;
};

export const checkRefreshToken = async (token) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_BASE_API}login/verifyrefreshtoken`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();
  return data;
};
