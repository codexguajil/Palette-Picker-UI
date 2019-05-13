import { fetchApiData } from './api.js';

describe('fetchApiData', () => {

  let mockData;
  let mockEndpoint;

  beforeEach(() => {

    mockData = { projects: [{}, {}, {}] };
    mockEndpoint = 'projects';

    fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    }));

  });

  it('should take an endpoint', () => {
    let host = process.env.REACT_APP_BACKEND_URL;

    fetchApiData(mockEndpoint);
    
    expect(fetch).toHaveBeenCalledWith(`${host}/api/v1/${mockEndpoint}`);
  });

  it('should return expected data', async () => {
    const result = await fetchApiData(mockEndpoint);

    expect(result).toEqual(mockData);
  });

  it('should throw an error if everything is not okay', async () => {
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      // json: jest.fn(() => Promise.resolve('fetch failed'))
    }));

    const expected = new Error();
    await expect(fetchApiData(mockEndpoint)).rejects.toEqual(expected);
  });

})