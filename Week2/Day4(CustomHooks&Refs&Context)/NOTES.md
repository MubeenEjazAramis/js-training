# Week 2 Day 4: Custom Hooks, Refs and Context

## Core Concepts & Learning Notes

### 1. Referencing Values with `useRef`
When you want a component to remember some information, but you **don't want that information to trigger new renders**, you use `useRef`:
- `const ref = useRef(initialValue);`
- Returns a plain JavaScript object: `{ current: initialValue }`.
- Unlike state, reading or mutating `ref.current` is synchronous and **does not trigger a component re-render**.
- **Common use cases:**
  - Storing timer / interval IDs (`timerRef.current = setInterval(...)`).
  - Storing previous state or prop values for comparison.
  - Storing values that don't directly affect the visual output of the JSX.

### 2. Manipulating the DOM with `useRef`
While React manages the DOM automatically, sometimes you need imperative escape hatches:
- Pass the ref to a JSX node: `<input ref={inputRef} />`.
- After React commits the DOM node, it assigns `inputRef.current` to the actual HTML DOM element.
- **Common use cases:**
  - Focusing an input (`inputRef.current.focus()`).
  - Scrolling to an element (`elementRef.current.scrollIntoView()`).
  - Measuring element dimensions (`ref.current.getBoundingClientRect()`).
- **Best Practice:** Avoid modifying or deleting DOM nodes manually with native methods (`appendChild`, `remove`); use refs primarily for non-destructive DOM operations like focus, scroll, and measurements.

### 3. Reusing Logic with Custom Hooks
Custom hooks let you extract and reuse stateful logic between components without sharing the state itself:
- A custom hook is a standard JavaScript function whose name starts with `"use"` (e.g., `useFetch`, `useDebounce`, `useLocalStorage`).
- Inside the custom hook, you can call built-in React hooks (`useState`, `useEffect`, `useRef`, `useCallback`, etc.).
- **Crucial Rule:** Each time a component calls a custom hook, it gets an isolated, independent copy of that state. Calling `useToggle()` in Component A does not affect the state of `useToggle()` in Component B.
- **Hooks Created Today:**
  - `useToggle(initial)`: Quick boolean toggle with `prev => !prev`.
  - `useLocalStorage(key, initial)`: Syncs state with browser `localStorage`, includes `try / catch` to safely handle corrupt/invalid JSON.
  - `useWindowWidth()`: Subscribes to `window.addEventListener('resize')` with proper cleanup.
  - `useDebounce(value, delay)`: Defers search queries using `setTimeout` and cleanup `clearTimeout`.
  - `useFetch(url)`: Fetches data with `loading`, `error`, `data`, and manual `refetch()` trigger, including `AbortController` cancellation.

### 4. Passing Data Deeply with Context API
Passing props down through multiple layers of components (prop drilling) makes components rigid and tedious to maintain:
- Context provides a way to pass data through the component tree without manually passing props at every level.
- **Steps:**
  1. `createContext()`: Creates the context object.
  2. `<Context.Provider value={...}>`: Provides the data to any child component in the subtree.
  3. `useContext(Context)`: Consumes the data directly from any nested descendant.
- **Today's Implementations:**
  - `ThemeContext`: Provides `theme` ('light' / 'dark') and `toggleTheme()`, remembered in `localStorage`.
  - `FavoritesContext`: Provides `favorites`, `isFavorite()`, `toggleFavorite()`, and drawer controls without passing callbacks down through `RecipeGrid` -> `RecipeCard`.

### 5. Extracting State Logic into `useReducer`
When a component has multiple state updates spread across event handlers or transitions that depend on each other, `useReducer` organizes them into a clean, predictable state machine:
- **Architecture:**
  - **State:** The current data snapshot.
  - **Action:** A plain object describing *what happened* (e.g. `{ type: 'added', text, priority }`).
  - **Reducer:** A pure function `(state, action) => newState` that computes the next state.
  - **Dispatch:** Function to send actions to the reducer.
- Reducers must remain pure: no direct mutations (always return new copies of arrays/objects) and no side effects (no network calls or timers inside the reducer).

---

## Stand-Up Interview Questions & Answers

### 1. `useRef` vs `useState`: which triggers a re-render?
- **`useState` triggers a re-render:** Whenever you call the state setter function (`setState(newValue)`) with a different value, React schedules a re-render of the component and updates the DOM.
- **`useRef` does NOT trigger a re-render:** A ref is simply a plain JavaScript object `{ current: value }`. When you change `ref.current = newValue`, React does not know and does not schedule a re-render.
- **When to choose which:**
  - Use `useState` if the data needs to be displayed on the screen or if changing it must update the UI.
  - Use `useRef` if you need to remember information between renders that has no direct impact on the JSX output (like an interval ID, a timeout handle, or a DOM element reference).

### 2. What makes a function a custom hook?
- A function qualifies as a custom hook if it satisfies two conditions:
  1. **Naming convention:** Its name starts with `"use"` followed by a capital letter (e.g. `useFetch`, `useWindowWidth`). This tells React's linter to enforce the Rules of Hooks.
  2. **Calls other hooks:** It calls at least one built-in React hook (like `useState`, `useEffect`, `useRef`, or `useContext`) or another custom hook inside its body.
- If a function does not call any hooks, it is just a regular utility helper function and should not be named with the `"use"` prefix.

### 3. When is context the wrong tool?
Context is powerful for global or semi-global data, but it is the wrong tool in the following scenarios:
1. **High-frequency updates:** If state changes rapidly (like mouse coordinates, audio waveforms, or keystrokes in a large form), every component consuming that context will re-render on each tick, causing performance bottlenecks.
2. **Simple prop passing (1–2 levels):** If a child is only one or two levels below its parent, passing props directly is simpler, faster, and makes data flow much more obvious and readable.
3. **Reusable, independent components:** Tying a generic UI component (like an input or modal) to a specific context makes it difficult to reuse elsewhere in the application where that provider does not exist.
