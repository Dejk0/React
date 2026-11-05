# 06 - Styling

The core idea of styling in React: **compute the `className` or `style` of an element from state.** React itself does not manage the CSS.

## Files

| File | Topic |
|---|---|
| `StylingExample.tsx` | Entry point, combines the demos |
| `InlineStyleDemo.tsx` | Inline `style` object |
| `CssModuleDemo.tsx` + `Badge.module.css` | CSS Modules + conditional classes |
| `CssVariablesDemo.tsx` | CSS variables, theming |
| `cx.ts` | Mini `clsx` (joins class names) |

## 1. Inline style

```tsx
<p style={{ color: active ? 'green' : 'gray', fontSize: '1.5rem' }}>...</p>
```

- An object with **camelCase** keys (`fontSize`, not `font-size`).
- For numbers React appends `px` (`{ width: 100 }` -> `100px`), but only for certain properties. Otherwise write a string.
- Type: `CSSProperties`.
- **Limitations:** no `:hover`, `:focus`, media queries or pseudo-elements (`::before`), and it is not reusable.
- **Good for:** a single value computed at runtime (e.g. width, position).

## 2. CSS Modules

```css
/* Badge.module.css */
.badge { padding: 0.25rem 0.75rem; }
.badge:hover { border-color: #333; }
.active { background: #4caf50; }
```

```tsx
import styles from './Badge.module.css';

<button className={`${styles.badge} ${active ? styles.active : ''}`} />
```

- The file name must end with `.module.css` (no extra setup needed in Vite).
- The build renames the classes (`_badge_x7f2k_1`), so they **can't collide** with other components.
- Full CSS is available: `:hover`, media queries, animations.
- A class name is a **property**, not a string: `styles.badge`. For dashed names: `styles['my-class']`.
- **Good for:** the default choice for your own components.

### Conditional classes: `clsx`

Template strings get unreadable quickly:

```tsx
className={`${styles.badge} ${active ? styles.active : ''} ${large ? styles.large : ''}`}
```

Instead:

```tsx
className={cx(styles.badge, active && styles.active, large && styles.large)}
```

`cx` in `cx.ts` is a minimal implementation. In a real project: `npm i clsx` and `import clsx from 'clsx'`.

## 3. CSS variables (custom properties)

```tsx
<div className="theme-box" style={{ '--bg': '#222', '--accent': accent }}>
```

```css
.theme-box { background: var(--bg); border: 2px solid var(--accent); }
.theme-box button:hover { background: var(--accent); }
```

- React only passes the **value**; CSS decides what to do with it. So `:hover`, media queries etc. keep working while the value stays dynamic.
- This is the best way to handle dynamic values, better than piling up inline styles.
- **TypeScript:** `CSSProperties` doesn't know `--something` keys, so extend it:

  ```ts
  type ThemeStyle = CSSProperties & Record<`--${string}`, string>;
  ```

- Variables are inherited by child elements, which makes them ideal for theming.

## Which one to use?

| Situation | Solution |
|---|---|
| Static look, hover, media queries | CSS Module (or Tailwind) |
| Runtime-computed value (color, size) | CSS variable set via `style` |
| One-off, tiny value | Inline style |
| Several conditional classes | `clsx` |

## Not shown here (needs extra packages)

- **Tailwind CSS**: utility classes directly in `className`. The conditional logic is the same as above (`clsx`); use `tailwind-merge` to resolve conflicting classes.
- **CSS-in-JS** (styled-components, Emotion): styles live in JS, with a runtime cost. Problematic with Server Components. Zero-runtime alternatives: vanilla-extract, Panda CSS.
- **Sass/SCSS**: `npm i -D sass`, then `.scss` / `.module.scss` files just work.

## Common mistakes

- Use `className`, not `class`.
- Passing a string instead of an object to inline style: `style="color: red"` is wrong, `style={{ color: 'red' }}` is right.
- Accidental clashes in global CSS: a good reason to use CSS Modules.
- Putting a `<style>` tag inside a component is demo-only: it has global effect and is re-inserted on every render. Use a separate file in real code.
