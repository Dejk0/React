import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    // cleanup: runs when the component unmounts (and before the effect re-runs)
    return () => clearInterval(id);
  }, []); // empty deps => run once after the first render

  return <p>Timer running for {seconds}s</p>;
}

function UserLoader() {
  const [userId, setUserId] = useState(1);
  // result is tagged with the id it belongs to, so "loading" can be derived
  const [result, setResult] = useState({ id: null, user: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((user) => setResult({ id: userId, user, error: null }))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setResult({ id: userId, user: null, error: err.message });
        }
      });

    // abort stale requests when userId changes quickly
    return () => controller.abort();
  }, [userId]); // re-run whenever userId changes

  const loading = result.id !== userId;
  const { user, error } = result;

  return (
    <div>
      <button onClick={() => setUserId((id) => (id % 10) + 1)}>Next user</button>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>Error: {error}</p>}
      {!loading && user && (
        <p>
          #{user.id} {user.name} ({user.email})
        </p>
      )}
    </div>
  );
}

export default function EffectsExample() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <section>
      <h2>08 - Effects</h2>
      <button onClick={() => setShowTimer((v) => !v)}>
        {showTimer ? 'Hide' : 'Show'} timer
      </button>
      {showTimer && <Timer />}
      <UserLoader />
    </section>
  );
}
