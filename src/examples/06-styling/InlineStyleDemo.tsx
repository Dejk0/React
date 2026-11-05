import { useState, type CSSProperties } from 'react';

// Inline styles: an object with camelCase keys. Good for values that are
// computed at runtime. Limits: no :hover, no media queries, no pseudo-elements.
const baseStyle: CSSProperties = {
  padding: '0.5rem',
  transition: 'all 0.3s', // animating between two state-driven values
};

export default function InlineStyleDemo() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <h3>Inline style</h3>
      <button onClick={() => setActive((a) => !a)}>Toggle</button>
      <p
        style={{
          ...baseStyle,
          color: active ? 'green' : 'gray',
          fontSize: active ? '1.5rem' : '1rem',
        }}
      >
        Inline style driven by state
      </p>
    </div>
  );
}
