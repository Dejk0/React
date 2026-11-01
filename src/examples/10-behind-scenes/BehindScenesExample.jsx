import { memo, useCallback, useMemo, useState } from 'react';

// memo: skip re-rendering when props are unchanged
const ExpensiveList = memo(function ExpensiveList({ items, onSelect }) {
  // open the console: this only logs when props actually changed
  console.log('ExpensiveList rendered');
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item} onClick={() => onSelect(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Counter: {count}</button>;
}

export default function BehindScenesExample() {
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState('-');
  const [resetKey, setResetKey] = useState(0);

  const items = useMemo(
    () => ['apple', 'banana', 'cherry', 'date'].filter((i) => i.includes(filter)),
    [filter]
  );
  // stable function identity so memo() on the child actually works
  const handleSelect = useCallback((item) => setSelected(item), []);

  return (
    <section>
      <h2>10 - Behind the Scenes</h2>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter fruits"
      />
      <p>Selected: {selected}</p>
      <ExpensiveList items={items} onSelect={handleSelect} />

      <h3>Changing the key resets component state</h3>
      <Counter key={resetKey} />
      <button onClick={() => setResetKey((k) => k + 1)}>Reset counter (new key)</button>
    </section>
  );
}
