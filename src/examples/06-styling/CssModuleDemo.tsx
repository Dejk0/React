import { useState } from 'react';
import styles from './Badge.module.css';
import { cx } from './cx';

// styles.badge is a string: the generated, unique class name.
export default function CssModuleDemo() {
  const [active, setActive] = useState(false);
  const [large, setLarge] = useState(false);

  return (
    <div>
      <h3>CSS Module + cx()</h3>
      <button
        // Without a helper: `${styles.badge} ${active ? styles.active : ''}` gets messy fast.
        className={cx(styles.badge, active && styles.active, large && styles.large)}
        onClick={() => setActive((a) => !a)}
      >
        {active ? 'Active' : 'Inactive'}
      </button>{' '}
      <label>
        <input type="checkbox" checked={large} onChange={(e) => setLarge(e.target.checked)} />
        large
      </label>
    </div>
  );
}
