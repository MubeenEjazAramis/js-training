# Week 2 Day 2: State and Events

## Core Concepts

### 1. Responding to Events
In React, event handlers are functions passed as props to JSX elements:
- Use camelCase for event handlers (e.g., `onClick`, `onChange`, `onSubmit`).
- Pass the function itself (`onClick={handleClick}`), do not call it (`onClick={handleClick()}`).
- For form submissions, use `e.preventDefault()` to stop the default browser page reload.

### 2. State: A Component's Memory
Local variables do not persist between renders, and changes to local variables do not trigger a re-render.
- The `useState` hook provides two things:
  1. A state variable to retain the value between renders.
  2. A state setter function to update the variable and trigger React to re-render the component.

### 3. Render and Commit
UI requests and updates in React happen in three steps:
1. **Triggering a render:** Initial load or state update via setter function.
2. **Rendering the component:** React calls your component function to determine what JSX to display.
3. **Committing to the DOM:** React modifies DOM nodes only where differences exist between the new and old render outputs.

### 4. State as a Snapshot
State behaves like a snapshot of the UI for that specific render pass:
- Setting state does not change the existing state variable in the currently executing code; it schedules a new render with the new value.
- Within a single render cycle, state remains constant.

### 5. Queueing a Series of State Updates
When multiple updates are needed in sequence before the next render:
- Use updater functions: `setCount(prev => prev + 1)`.
- Updater functions queue operations that React executes in sequence during the next render.

### 6. Updating Objects and Arrays in State
State in React should be treated as read-only (immutable):
- **Never mutate objects or arrays directly:** Do not use `obj.prop = value` or `arr.push(item)`.
- **Use spread syntax or non-mutating methods:**
  - Adding an item: `[newItem, ...prevArray]`
  - Removing an item: `prevArray.filter(item => item.id !== id)`
  - Updating an item: `prevArray.map(item => item.id === id ? { ...item, completed: !item.completed } : item)`

### 7. Sharing State Between Components (Lifting State Up)
When two or more components need access to the same changing data:
- Lift the shared state up to their closest common parent component.
- Pass the state down as props to children that need to display it.
- Pass event callback functions down to children that need to modify it.

---

## Stand-Up Interview Questions & Answers

### 1. Why doesn't changing a normal variable update the screen?
There are two key reasons:
1. **Local variables don't persist across renders:** When React re-renders a component, it executes the function from scratch. Any local variables are re-initialized to their starting values.
2. **Changes to local variables don't trigger re-renders:** React has no way of knowing that a plain JavaScript variable has changed. Only a state setter function provided by `useState` signals to React that the data has changed and that a re-render is required to update the UI on the screen.

### 2. Why is `todos.push(t); setTodos(todos)` wrong?
This is wrong for two critical reasons:
1. **Mutation of existing state:** `todos.push(t)` mutates the existing array in memory. In React, state must be treated as immutable.
2. **Same object reference:** `todos` still points to the exact same array reference in memory. When React compares the previous state with the new state (`Object.is(oldState, newState)`), it sees the exact same memory reference and assumes nothing changed, leading to missed re-renders or subtle UI rendering bugs.
Instead, always create a new array with the spread operator: `setTodos([...todos, t])`.

### 3. How did you decide which component owns the state?
We determined state ownership using the **"Lifting State Up"** principle:
- `todos`: Needed by `TodoList` (to display tasks), `FilterBar` (to filter/search), and `TodoFooter` (to calculate tasks left and clear completed). Their closest common parent is `TodoApp`, so `TodoApp` owns `todos`.
- `filter`, `searchQuery`, and `sortByPriority`: Controlled inside `FilterBar` but directly dictate what tasks `TodoList` renders. Therefore, they must reside in `TodoApp`.
- Form inputs (`text`, `priority`): Only relevant while the user is typing in `TodoForm`. Once submitted, the resulting task is passed up via callback, so temporary input state is encapsulated locally within `TodoForm`.
- Inline editing state (`isEditing`, `draftText`): Only concerns the specific item being edited, so it is kept locally inside `TodoItem`.
