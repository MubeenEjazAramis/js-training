# Week 2 Day 3: Effects and Data Fetching

## Core Concepts

### 1. Synchronizing with Effects
Effects allow you to run code after rendering so that you can synchronize a component with external systems (network requests, browser DOM, timers, or third-party widgets):
- Render code runs during the calculation of JSX and must remain pure (no side effects, no mutations).
- Effect code runs **after the browser paints**, making it the safe location for non-pure side-effect operations like data fetching and event subscriptions.

### 2. You Might Not Need an Effect
Many scenarios commonly handled with effects are better solved without them:
- **Transforming data for render:** Calculate derived values directly during render rather than saving them into redundant state via an effect (e.g., `const isDebouncing = searchTerm !== debouncedQuery;`).
- **Handling user interactions:** Put logic directly inside event handlers (`onClick`, `onSubmit`) instead of setting a flag in state and running an effect.
- **Resetting state when a prop changes:** Pass a unique `key` to the component to trigger a fresh remount rather than resetting state inside `useEffect`.

### 3. Lifecycle of Reactive Effects
Unlike class component lifecycles (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`), an effect synchronizes with props and state values:
- It starts synchronizing when the component mounts or when any value in its dependency array changes.
- It stops synchronizing (runs its cleanup function) before the next effect run and when the component unmounts.

### 4. Race Condition Handling in Data Fetching
When multiple asynchronous network requests are triggered in quick succession (e.g., as the user types), responses may arrive out of order:
- If a slower, older request finishes *after* a faster, newer request, stale data would overwrite the fresh UI.
- **The Solution:** Use an `ignore` flag in the effect's cleanup function:
  ```jsx
  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      if (!ignore) {
        setData(data);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [query]);
  ```
- Combined with `AbortController`, in-flight HTTP requests are cancelled immediately when parameters change.

---

## Stand-Up Interview Questions & Answers

### 1. What does the dependency array control?
The dependency array tells React **when to re-synchronize (re-run) your effect**:
- **No dependency array (`useEffect(fn)`):** The effect runs after *every single render*.
- **Empty dependency array (`useEffect(fn, [])`):** The effect runs only *once* after the component mounts on screen and its cleanup runs on unmount.
- **Array with dependencies (`useEffect(fn, [query, category])`):** React compares each dependency to its value from the previous render using `Object.is()`. If even one value has changed, React cleans up the previous effect and runs the new effect. If all values are identical, React skips running the effect.

### 2. When does cleanup run?
The cleanup function runs in two distinct scenarios:
1. **Before the effect runs again:** Whenever a re-render occurs where one of the dependencies has changed, React first executes the cleanup function from the previous effect execution to tear down old timers, subscriptions, or network flags, and then executes the fresh effect.
2. **When the component unmounts:** When the component is removed from the DOM, React runs the final cleanup to prevent memory leaks and zombie event listeners.

### 3. Name two cases where you shouldn't use `useEffect`.
1. **Transforming data for rendering:** When you need to calculate derived data from props or state (such as filtering a list or calculating totals), do it directly in the component body during render. Storing calculated values in separate state via `useEffect` causes redundant render passes and state de-synchronization.
2. **Handling direct user actions:** Operations that happen in response to user events (like submitting a form, purchasing an item, or navigating on click) belong directly inside the event handler function (`onSubmit` or `onClick`), not in a `useEffect`. Effects should only represent synchronization that must happen *because the component displayed*, not because of a specific user click.
