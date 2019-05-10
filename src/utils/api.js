export const fetchApiData = async (endpoint) => {
 const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/${endpoint}`)
 if(response.ok) {
  const parsedData = await response.json()
  return parsedData;
} else {
  throw Error(response.statusText)
  }
}