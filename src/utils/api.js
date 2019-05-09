export const fetchProjects = async () => {
 const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/projects')
 if(response.ok) {
  const parsedData = await response.json()
  return parsedData;
} else {
  throw Error(response.statusText)
  }
}