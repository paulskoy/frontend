export const loginApi = async (endpoint, data) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_BASE_API}login/${endpoint}`,
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const dataRes = await res.json();

  return dataRes;
};
