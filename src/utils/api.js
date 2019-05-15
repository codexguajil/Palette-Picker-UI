export const fetchApiData = async (endpoint, options) => {
  let url = process.env.REACT_APP_BACKEND_URL + `/api/v1/${endpoint}`
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}