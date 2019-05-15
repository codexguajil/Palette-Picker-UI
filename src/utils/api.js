export const fetchApiData = async (endpoint) => {
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/${endpoint}`);
  if(response.ok) {
    const data = await response.json();
    return data;

  } else {
    throw Error(response.statusText);
  }
  
}

export const postApiData = async (endpoint, data) => {
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const data = await response.json();
    return data;

  } else {
    throw Error(response.statusText);
  }
}

export const deleteApiData = async (endpoint) => {
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/${endpoint}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    // console.log(response);
    return response.statusText;
    // const data = await response.json();
    // return data;

  } else {
    throw Error(response.statusText);
  }
}