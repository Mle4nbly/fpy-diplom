export const getRequestOptions = ({
  method,
  body,
  signal,
  token,
}: RequestInit & { token: string | null }): RequestInit => {
  const isFormData = body instanceof FormData;
  const headers = new Headers();

  if (!isFormData) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Token ${token}`);
  }

  const requestOptions: RequestInit = {
    method,
    signal,
    headers,
  };

  if (body) {
    requestOptions.body = body
  }
  
  return requestOptions;
};
