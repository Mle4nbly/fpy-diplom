export const parseResponse = async (response: Response) => {

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');

  if (!contentType) {
    return null;
  }

  if (contentType.includes('application/json')) {
    return await response.json();
  }

  return await response.text();
};