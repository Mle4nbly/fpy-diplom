import { useEffect, useRef, useState } from "react";

export const useApi = <T>(endpoint: string) => {
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
        const response = await fetch(`http://localhost:3000${endpoint}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Ошибка запроса");

        const jsonData = await response.json();
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

  const sendData = async <B>(method: "POST" | "PUT" | "DELETE", body?: B) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
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
