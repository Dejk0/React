import { useState, type CSSProperties } from 'react';

// CSS custom properties: React sets the *value*, CSS decides how to use it.
// This keeps :hover, media queries etc. available while still being dynamic.
const css = `
  .theme-box {
    background: var(--bg);
    color: var(--fg);
    border: 2px solid var(--accent);
    padding: 1rem;
    border-radius: 0.5rem;
    transition: background 0.3s, color 0.3s;
  }
  .theme-box button:hover { background: var(--accent); color: var(--bg); }
`;

const THEMES = {
  light: { '--bg': '#ffffff', '--fg': '#222222' },
  dark: { '--bg': '#222222', '--fg': '#f0f0f0' },
};

// TypeScript doesn't know custom properties, so widen the type with a cast.
type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

export default function CssVariablesDemo() {
  const [theme, setTheme] = useState<keyof typeof THEMES>('light');
  const [accent, setAccent] = useState('#4caf50');

  const style: ThemeStyle = { ...THEMES[theme], '--accent': accent };

  return (
    <div>
      <h3>CSS variables (theming)</h3>
      <style>{css}</style>
      <div className="theme-box" style={style}>
        <p>Current theme: {theme}</p>
        <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          Switch theme
        </button>{' '}
        <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} />
      </div>
    </div>
  );
}
