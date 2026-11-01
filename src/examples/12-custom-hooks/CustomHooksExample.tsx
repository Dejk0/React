import { useEffect, useState } from 'react';

// Custom hook 1: state that is persisted in localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable - ignore */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// Custom hook 2: reusable data fetching
function useFetch<T = unknown>(url: string) {
  // result is tagged with its url, so "loading" can be derived
  const [result, setResult] = useState<{
    url: string | null;
    data: T | null;
    error: string | null;
  }>({ url: null, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error('Request failed');
        return r.json();
      })
      .then((data) => setResult({ url, data, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResult({ url, data: null, error: error.message });
        }
      });
    return () => controller.abort();
  }, [url]);

  const loading = result.url !== url;
  return { data: loading ? null : result.data, error: loading ? null : result.error, loading };
}

type Post = { id: number; title: string };

export default function CustomHooksExample() {
  const [name, setName] = useLocalStorage('example-name', '');
  const { data, loading, error } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=3'
  );

  return (
    <section>
      <h2>12 - Custom Hooks</h2>
      <label>
        Your name (survives reload):{' '}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <p>Hello {name || 'stranger'}!</p>

      <h3>Posts</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>{data?.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
    </section>
  );
}
