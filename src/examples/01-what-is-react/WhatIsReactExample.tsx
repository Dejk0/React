import { useState } from 'react';

// Declarative UI: describe WHAT to show for the current state.
// React updates the DOM for you (no document.getElementById / textContent).
export default function WhatIsReactExample() {
  const [clicks, setClicks] = useState(0);

  return (
    <section>
      <h2>01 - What is React</h2>
      <p>Button clicked {clicks} times.</p>
      <button onClick={() => setClicks(clicks + 1)}>Click me</button>
    </section>
  );
}
