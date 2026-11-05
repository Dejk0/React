import InlineStyleDemo from './InlineStyleDemo';
import CssModuleDemo from './CssModuleDemo';
import CssVariablesDemo from './CssVariablesDemo';
import ValidationDemo from './ValidationDemo';

// Three ways to style a component. Rule of thumb:
//  - static look, hover, media queries -> CSS Module (or Tailwind)
//  - runtime value (color, width, ...)  -> CSS variable set via `style`
//  - tiny one-off                       -> inline style
//
// Not shown (needs extra packages): Tailwind (utility classes, same className
// logic + `clsx`/`tailwind-merge`) and CSS-in-JS (styled-components, Emotion).
export default function StylingExample() {
  return (
    <section>
      <h2>06 - Styling</h2>
      <InlineStyleDemo />
      <CssModuleDemo />
      <CssVariablesDemo />
      <ValidationDemo />
    </section>
  );
}
