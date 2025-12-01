import { useRef, useState } from "react";

export const useApi = <T extends { id: number }>(token?: string) => {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const getHeaders = (isFormData: boolean) => {
    const headers = new Headers()

    if (!isFormData) {
      headers.set('Content-Type', 'application/json')
    }
    
    if (token) {
      headers.set('Authorization', `Token ${token}`)
    }

    return headers;
  }

  const getData = async (endpoint: string) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api${endpoint}/`, {
        signal: controller.signal,
        headers: getHeaders(false),
      });

      if (!response.ok) throw new Error("Ошибка GET-запроса");

      const jsonData = await response.json();
      setData(jsonData);
      return jsonData;
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setError(error.message);
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const sendData = async (
    method: "POST" | "PUT" | "DELETE" | "PATCH",
    endpoint: string,
    body?: any
  ) => {
    setError(null);
    setLoading(true);
    try {
      let fetchOptions: RequestInit = {
        method,
        headers: getHeaders(false),
      };

      if (body instanceof FormData) {
        fetchOptions.body = body;
        fetchOptions.headers = getHeaders(true);
      } else if (body) {
        fetchOptions.body = JSON.stringify(body);
      }

      console.log(fetchOptions);
      
      const response = await fetch(`http://localhost:8000/api${endpoint}/`, fetchOptions);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const textResponse = await response.text();
      return textResponse ? JSON.parse(textResponse) : "No body";
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== "AbortError") {
        setError(error.message);
        console.log(error.message);
      } else {
        setError("Неопознанная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, setData, getData, sendData };
};