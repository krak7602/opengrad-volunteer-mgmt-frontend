import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseFetchOptions extends RequestInit {
    autoInvoke?: boolean;
}

export function useFetch<T>(url: string, { autoInvoke = true, ...options }: UseFetchOptions = {}) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const controller = useRef<AbortController | null>(null);
    // const full = cookies().get("connect.sid")
    const full = localStorage.getItem("authCookie")
    console.log("This is full:",full)
    // const val = full?.name + "=" + full?.value
    

    const refetch = useCallback(() => {
        if (!url) {
            return;
        }

        if (controller.current) {
            controller.current.abort();
        }

        controller.current = new AbortController();

        setLoading(true);

        return fetch(url, {
            signal: controller.current.signal, headers: {
                "Cookie": full?? "",
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                setLoading(false);
                return res as T;
            })
            .catch((err) => {
                setLoading(false);

                if (err.name !== 'AbortError') {
                    setError(err);
                }

                return err;
            });
    }, [url]);

    const abort = useCallback(() => {
        if (controller.current) {
            controller.current?.abort('');
        }
    }, []);

    useEffect(() => {
        if (autoInvoke) {
            refetch();
        }

        return () => {
            if (controller.current) {
                controller.current.abort('');
            }
        };
    }, [refetch, autoInvoke]);

    return { data, loading, error, refetch, abort };
}