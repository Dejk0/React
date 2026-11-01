# React Key Concepts - Topic Guide

A practical overview of every chapter of *React Key Concepts (2nd ed.)*: what each topic is for and where you would use it in a real project.
Runnable demos for chapters 1-14 live in [src/examples/](src/examples/).

## Running the demos

Everything lives on this one branch. `src/main.jsx` renders [src/examples/ExamplesApp.jsx](src/examples/ExamplesApp.jsx), a picker with one button per chapter. Run `npm run dev` and click through the demos. Your own practice code in `src/App.jsx` is untouched (to use it again, switch the import in `src/main.jsx` back to `./App.jsx`).

Chapters 15-17 (Next.js / Server Components / Suspense) are described only, because they need a Next.js project.

---

## 1. What is React - [01-what-is-react](src/examples/01-what-is-react/WhatIsReactExample.jsx)
**What:** A JavaScript library for building UIs out of components. You describe *what* the UI should look like for a given state, React figures out *how* to update the DOM.
**Use it for:** Interactive web apps (dashboards, shops, social apps) where the UI changes often. Overkill for a static page.

## 2. Components & JSX - [02-components-jsx](src/examples/02-components-jsx/ComponentsJsxExample.jsx)
**What:** A component is a function that returns JSX (HTML-like syntax in JavaScript). Components are reusable building blocks.
**Use it for:** Splitting a page into pieces (`Header`, `ProductCard`, `Footer`) so each piece can be reused and maintained on its own.

## 3. Props - [03-components-props](src/examples/03-components-props/PropsExample.jsx)
**What:** Inputs passed from a parent to a child component, like function arguments. They are read-only. `children` is a special prop for nested content.
**Use it for:** Making components configurable: one `Button` with different labels, one `Card` wrapping any content.

## 4. State & Events - [04-state-events](src/examples/04-state-events/StateEventsExample.jsx)
**What:** `useState` stores data that changes over time; changing it re-renders the component. Event props (`onClick`, `onChange`) react to user actions.
**Use it for:** Anything interactive: counters, toggles, form inputs, open/closed menus. Use the functional form `setX(cur => ...)` when the new value depends on the old one.

## 5. Lists & Conditional Content - [05-lists-conditional](src/examples/05-lists-conditional/ListsConditionalExample.jsx)
**What:** `array.map()` renders lists (each item needs a stable `key`); `&&`, ternaries or early returns render content conditionally.
**Use it for:** Product lists, comment threads, loading/error/empty states, showing a modal only when needed.

## 6. Styling - [06-styling](src/examples/06-styling/StylingExample.jsx)
**What:** Ways to style components: plain CSS files, inline `style`, CSS Modules (scoped class names), CSS-in-JS / utility libraries like Tailwind.
**Use it for:** CSS Modules or Tailwind to avoid class-name collisions in bigger apps; inline styles for truly dynamic values.

## 7. Portals & Refs - [07-portals-refs](src/examples/07-portals-refs/PortalsRefsExample.jsx)
**What:** `createPortal` renders a component into a different DOM node (e.g. `document.body`). `useRef` holds a mutable value or a DOM element without triggering re-renders.
**Use it for:** Portals: modals, tooltips, toasts that must escape `overflow: hidden` parents. Refs: focusing an input, scrolling to an element, reading uncontrolled input values, storing timer IDs.

## 8. Effects - [08-effects](src/examples/08-effects/EffectsExample.jsx)
**What:** `useEffect` runs side effects *after* render to sync with something outside React. The dependency array controls when it re-runs; the returned cleanup function undoes the effect.
**Demo:** a timer with `setInterval` + cleanup, and a fetch that re-runs when the id changes and aborts stale requests.
**Use it for:** Data fetching, subscriptions, timers, event listeners on `window`, document title changes.
**Rule of thumb:** If something can be computed during render or handled in an event handler, you do *not* need an effect.

## 9. Form Actions - [09-form-actions](src/examples/09-form-actions/FormActionsExample.jsx)
**What:** React 19 lets `<form action={fn}>` call a function with the `FormData`. Companion hooks: `useActionState` (result/error state of the action), `useFormStatus` (pending state for child components), `useOptimistic` (show the expected result immediately).
**Demo:** an "add todo" form with validation, a pending submit button and an optimistic list entry.
**Use it for:** Login/signup/contact forms, any create/update flow where you want less manual `onChange` + `useState` wiring and snappy UI feedback.

## 10. Behind the Scenes - [10-behind-scenes](src/examples/10-behind-scenes/BehindScenesExample.jsx)
**What:** How React renders: state/prop changes trigger a re-render of that component and its children; React diffs the result and updates only the changed DOM. Tools: `memo`, `useMemo`, `useCallback`, `key` (changing it resets component state), StrictMode (double-renders in dev to expose bugs), the React Compiler (automatic memoization).
**Demo:** a memoized list that only re-renders when its props change, and a counter reset via `key`.
**Use it for:** Fixing real performance problems (measure first!) and debugging "why did this re-render / lose its state?". With the React Compiler enabled in this project you rarely need manual memoization.

## 11. Complex State - [11-complex-state](src/examples/11-complex-state/ComplexStateExample.jsx)
**What:** `useReducer` centralizes state transitions in one reducer function (`dispatch({type, ...})`). Context (`createContext` + `useContext`) shares state with deeply nested components without prop drilling.
**Demo:** a shopping cart (add / remove / clear) shared between a product list and a cart view.
**Use it for:** Carts, multi-step wizards, auth state, themes, anything where many actions change related state or many components need the same data. For very large apps consider Redux/Zustand.

## 12. Custom Hooks - [12-custom-hooks](src/examples/12-custom-hooks/CustomHooksExample.jsx)
**What:** A function whose name starts with `use` that calls other hooks. It lets you extract and reuse *stateful logic* (not UI) across components.
**Demo:** `useLocalStorage` (state persisted across reloads) and `useFetch` (loading/error/data handling).
**Use it for:** Repeated logic like form handling, fetching, debouncing, `useWindowSize`, `useOnlineStatus`. Keeps components short and logic testable.

## 13. Routing - [13-routing](src/examples/13-routing/RoutingExample.jsx)
**What:** Client-side routing (React Router) maps URLs to components without full page reloads. Key pieces: `Routes/Route`, nested routes + `Outlet` for shared layouts, `NavLink`/`Link`, dynamic params (`:productId` + `useParams`), `useNavigate`.
**Demo:** layout with navigation, product list, product detail page, 404 route (using `MemoryRouter` so it doesn't alter your address bar - use `BrowserRouter` in real apps).
**Use it for:** Any multi-page single-page application: shop with product pages, admin area with sidebar layout, bookmarkable/shareable URLs.

## 14. Routing with Data - [14-routing-data](src/examples/14-routing-data/RoutingDataExample.jsx)
**What:** The data-router APIs (`createBrowserRouter`) add `loader` functions (fetch data *before* a route renders, read with `useLoaderData`) and `action` functions (handle `<Form>` submissions, then `redirect`). Plus `errorElement` and `useNavigation` for pending UI.
**Demo:** a post list and detail page loaded via loaders, and a "new post" form handled by an action.
**Use it for:** Pages whose content depends on server data. Avoids `useEffect` fetching waterfalls and gives you built-in loading, error and mutation handling.

## 15. SSR & Next.js Intro *(no demo - needs a Next.js project)*
**What:** Server-side rendering produces HTML on the server so the first paint is fast and crawlers see real content; the browser then "hydrates" it. Next.js provides file-based routing, SSR/SSG and a build pipeline on top of React.
**Use it for:** Public sites where SEO and first-load speed matter: blogs, e-commerce, marketing pages.

## 16. React Server Components & Server Actions *(no demo - needs Next.js)*
**What:** Server Components run only on the server (can read databases/files directly, ship no JS to the client). Client Components (`'use client'`) handle interactivity. Server Actions (`'use server'`) are functions called from forms/events that execute on the server.
**Use it for:** Reducing bundle size and fetching data close to the source; mutations (create order, save profile) without writing a separate API endpoint.

## 17. Suspense & `use` *(no demo - best shown with RSC/Next.js)*
**What:** `<Suspense fallback={...}>` shows a fallback while a child is waiting (for lazy code or data). The `use` hook reads a promise (or context) during render, suspending until it resolves.
**Use it for:** Streaming parts of a page as their data arrives, showing skeletons, `React.lazy` code-splitting of heavy routes.

---

## Quick "which tool do I need?" cheat sheet

| Need | Tool |
| --- | --- |
| Value that changes and affects the UI | `useState` |
| Many related state changes / complex logic | `useReducer` |
| Share data across distant components | Context |
| Run code after render / sync with outside world | `useEffect` |
| Reference a DOM node or non-visual mutable value | `useRef` |
| Reuse stateful logic | Custom hook |
| Submit a form with pending/error/optimistic UI | Form actions (`useActionState`, ...) |
| Multiple pages / URLs | React Router |
| Load data per route | Router `loader` / `action` |
| SEO + fast first paint | Next.js (SSR / RSC) |
