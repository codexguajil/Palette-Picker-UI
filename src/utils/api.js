export const fetchApiData = async (endpoint, options) => {
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/${endpoint}`;
  const response = await fetch(url, options);

  switch(options.method) {
    case('DELETE') :
      return response;

    case('PATCH') :
      return response.json();

    default :
      const data = await response.json();
      return data
  }
}