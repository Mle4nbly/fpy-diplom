import { useEffect, useRef, useState } from "react";

export const useApi = <T>(endpoint: string, token?: string) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!endpoint) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchData = async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8000/api${endpoint}`, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
        });
        if (!response.ok) throw new Error("Ошибка запроса");

        const jsonData = await response.json();
        console.log(jsonData)
        setData(jsonData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } else {
          setError("Неопознанная ошибка");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [endpoint]);

  const sendData = async <B>(method: "POST" | "PUT" | "DELETE", body?: B, ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:8000/api${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: body ? JSON.stringify(body) : undefined,
      });

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

  return { data, loading, error, sendData };
};
