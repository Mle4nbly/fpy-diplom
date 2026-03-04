import { useCallback, useRef } from 'react';
import { ApiError } from '../../utils/ApiError';
import { getRequestOptions } from '../../utils/getRequestOptions';
import { parseResponse } from '../../utils/parseResponse';

export const useApi = (token: string | null) => {
  const abortRef = useRef<AbortController | null>(null);
  const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

  const getData = useCallback(async (endpoint: string) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(
        `${baseUrl}${endpoint}/`,
        getRequestOptions({
          signal: controller.signal,
          token,
        }),
      );

      const data = await parseResponse(response)

      if (!response.ok) {
        throw new ApiError(response.status, data?.error);
      }

      return data;
    } catch (error: unknown) {
      if (error instanceof Error && error.name == 'AbortError') {
        return null;
      }

      throw error;
    }
  }, [baseUrl, token])

  const sendData = useCallback(async (
    method: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    body?: BodyInit,
  ) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(
        `${baseUrl}${endpoint}/`,
        getRequestOptions({
          method,
          body,
          signal: controller.signal,
          token,
        }),
      );

      const data = await parseResponse(response)

      if (!response.ok) {
        throw new ApiError(response.status, data?.error);
      }

      return data ?? true;
    } catch (error: unknown) {
      if (error instanceof Error && error.name == 'AbortError') {
        return null;
      }

      throw error;
    }
  }, [baseUrl, token])

  const downloadData = useCallback(async (endpoint: string, filename: string) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(
        `${baseUrl}${endpoint}`,
        getRequestOptions({
          signal: controller.signal,
          token,
        }),
      );

      if (!response.ok) {
        const data = await parseResponse(response);
        throw new ApiError(response.status, data?.error);
      }

      const data = await response.blob();

      const url = window.URL.createObjectURL(data);

      const a = document.createElement('a');
      a.download = filename;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error: unknown) {
      if (error instanceof Error && error.name == 'AbortError') {
        return null;
      }

      throw error;
    }
  }, [baseUrl, token])

  return { getData, sendData, downloadData };
};
