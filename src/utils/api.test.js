import { fetchApiData } from './api.js';

describe('fetchApiData', () => {

  let mockData;
  let mockEndpoint;
  let mockOptions;

  beforeEach(() => {

    mockData = { projects: [{}, {}, {}] };
    mockEndpoint = 'projects';
    mockOptions = { method: "GET" }

    fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    }));

  });

  it('should take an endpoint and options', () => {
    let host = process.env.REACT_APP_BACKEND_URL
    let mockUrl = `${host}/api/v1/${mockEndpoint}`;
    

    fetchApiData(mockEndpoint, mockOptions);
    
    expect(fetch).toHaveBeenCalledWith(mockUrl, mockOptions);
  });

  it('should return expected data', async () => {
    const result = await fetchApiData(mockEndpoint, mockOptions);

    expect(result).toEqual(mockData);
  });

  it.skip('should throw an error if everything is not okay', async () => {
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      // json: jest.fn(() => Promise.resolve('fetch failed'))
    }));
    const results = await fetchApiData(mockEndpoint, mockOptions);
    const expected = new Error();

    await expect(results).rejects.toEqual(expected);
  });

})