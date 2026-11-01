import { useState } from 'react';

const FRUITS = [
  { id: 'f1', name: 'Apple', inStock: true },
  { id: 'f2', name: 'Banana', inStock: false },
  { id: 'f3', name: 'Cherry', inStock: true },
];

export default function ListsConditionalExample() {
  const [onlyInStock, setOnlyInStock] = useState(false);
  const visible = onlyInStock ? FRUITS.filter((f) => f.inStock) : FRUITS;

  return (
    <section>
      <h2>05 - Lists &amp; Conditional Content</h2>
      <label>
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(e) => setOnlyInStock(e.target.checked)}
        />{' '}
        Only in stock
      </label>

      {visible.length === 0 && <p>Nothing to show.</p>}
      <ul>
        {/* key: stable unique id, not the array index */}
        {visible.map((f) => (
          <li key={f.id}>
            {f.name} {f.inStock ? '✅' : '❌ sold out'}
          </li>
        ))}
      </ul>
    </section>
  );
}
