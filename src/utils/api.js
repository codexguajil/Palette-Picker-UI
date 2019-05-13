export const fetchApiData = async (endpoint) => {
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/${endpoint}`);

  if(response.ok) {
    const data = await response.json();
    return data;

  } else {
    throw Error(response.statusText);

  }
  
}