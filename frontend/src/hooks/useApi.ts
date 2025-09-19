import { useRef, useState } from "react";

export const useApi = <T>(token?: string) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const getData = async (endpoint: string) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api${endpoint}/`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });

      if (!response.ok) throw new Error('Ошибка GET-запроса');

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        };
      };
    } finally {
      setLoading(false);
    };

    return () => controller.abort();
  }

  const sendData = async (method: "POST" | "PUT" | "DELETE", body: any, endpoint: string) => {
    try {
      setLoading(true);
      setError(null);

      let fetchOptions: RequestInit = {
        method,
        headers: {
          "Authorization": `Token ${token}`
        },
        body: undefined,
      };
      
      if (body instanceof FormData) {
        fetchOptions.body = body;
      } else if (body) {
        fetchOptions.body = JSON.stringify(body);
        fetchOptions.headers = {
          ...fetchOptions.headers,
          "Content-Type": "application/json",
        };
      }

      const response = await fetch(`http://localhost:8000/api${endpoint}/`, fetchOptions);

      if (!response.ok) throw new Error("Ошибка отправки");
      return response.status;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } else {
        setError("Неопознанная ошибка");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getData, sendData };
};
