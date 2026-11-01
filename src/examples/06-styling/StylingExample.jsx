import { useState } from 'react';

// Dynamic classes + inline styles. (CSS Modules / Tailwind work the same way:
// you just compute the className string.)
const css = `
  .badge { padding: 0.25rem 0.75rem; border-radius: 1rem; border: 1px solid #888; }
  .badge.active { background: #4caf50; color: white; }
`;

export default function StylingExample() {
  const [active, setActive] = useState(false);

  return (
    <section>
      <h2>06 - Styling</h2>
      <style>{css}</style>
      <button className={`badge ${active ? 'active' : ''}`} onClick={() => setActive((a) => !a)}>
        {active ? 'Active' : 'Inactive'}
      </button>
      <p style={{ color: active ? 'green' : 'gray', fontSize: active ? '1.5rem' : '1rem' }}>
        Inline style driven by state
      </p>
    </section>
  );
}
