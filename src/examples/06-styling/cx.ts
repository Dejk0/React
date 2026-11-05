// Minimal version of the `clsx` package: joins truthy class names.
// In a real project: `npm i clsx` and `import clsx from 'clsx'`.
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
