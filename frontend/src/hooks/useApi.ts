import { useRef } from 'react';
import { ApiError } from '../utils/ApiError';
import { getRequestOptions } from '../utils/getRequestOptions';

export const useApi = (token: string | null) => {
  const abortRef = useRef<AbortController | null>(null);
  const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

  const getData = async (endpoint: string) => {
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

      let data = null;

      try {
        data = await response.json();
      } catch (error: unknown) {
        console.log(error);
      }

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
  };

  const sendData = async (
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

      let data = null;

      try {
        data = await response.json();
      } catch (error: unknown) {
        console.log(error);
      }

      if (!response.ok) {
        throw new ApiError(response.status, data?.error);
      }

      return response.status == 204 ? true : data;
    } catch (error: unknown) {
      if (error instanceof Error && error.name == 'AbortError') {
        return null;
      }

      throw error;
    }
  };

  const downloadData = async (endpoint: string, filename: string) => {
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

      let data = null;

      if (!response.ok) {
        try {
          data = await response.json();
        } catch (error: unknown) {
          console.log(error);
        }

        throw new ApiError(response.status, data.error);
      }

      data = await response.blob();

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
  };

  return { getData, sendData, downloadData };
};
