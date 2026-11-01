import { useState } from 'react';

export default function StateEventsExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <section>
      <h2>04 - State &amp; Events</h2>
      {/* functional update: new value depends on the old one */}
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <span style={{ margin: '0 1rem' }}>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>

      <p>
        {/* controlled input: value comes from state */}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </p>
      <p>You typed: {text}</p>
    </section>
  );
}
