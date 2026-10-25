# Week 2 Day 2: State and Events (React To-Do App)

A modern, interactive To-Do application built with React functional components, hooks (`useState`), event handling, and derived state.

---

## 5-Line Comparison: Vanilla JS vs React Version

1. **State Management:** In Vanilla JS, state was manually tracked in mutable variables and kept in sync with the DOM via manual query selectors, whereas in React, state is declared with `useState` and serves as the single declarative source of truth.
2. **UI Updates & Rendering:** Vanilla JS required imperative DOM mutations (e.g. `innerHTML = ''` and `createElement`) inside a custom render function, whereas React automatically recalculates and renders the virtual DOM efficiently upon state changes.
3. **Data Flow & Architecture:** Vanilla JS relied on global state and event delegation on container elements, whereas React uses a clear unidirectional data flow where state lives in the parent (`TodoApp`) and is distributed downward via props and callbacks.
4. **Derived State:** In Vanilla JS, filtered lists and task counts had to be manually recalculated and written to specific element nodes, while React calculates derived data dynamically during the render cycle without storing it in redundant state.
5. **Code Maintainability:** React's component-based decomposition (`TodoApp`, `TodoForm`, `TodoList`, `TodoItem`, `FilterBar`, `TodoFooter`) isolates responsibilities cleanly, making the codebase much easier to read, test, and scale compared to monolithic vanilla scripts.

---

## Features Implemented

- **Component Hierarchy:** Modular architecture composed of `TodoApp`, `TodoForm`, `TodoList`, `TodoItem`, `FilterBar`, and `TodoFooter`.
- **Centralized State:** All core application state resides exclusively in `TodoApp`; child components receive data and event callbacks strictly via props.
- **Combined Search & Status Filter:** A live search box filters tasks by keyword in tandem with `All`, `Active`, and `Done` status filters.
- **Priority System:**
  - Priority level (`High`, `Medium`, `Low`) is selected during task creation (defaults to `Medium`).
  - Represented visually by a coloured dot on each task item (High: red, Medium: amber, Low: emerald).
  - Includes a priority badge on each item.
- **Priority Sorting:** Sort dropdown allows ordering tasks by default order, High → Low priority, or Low → High priority.
- **Inline Task Editing:** Double-click any task text or click the "Edit" button to edit inline. Press `Enter` to save or `Escape` to cancel.
- **Derived State:** Active task count ("X tasks left") and filtered/sorted lists are computed during render rather than stored in state.
- **Persistence:** Automatically loads from and syncs with browser `localStorage`.
- **Zero Comments:** Component files contain clean, beginner-friendly JavaScript with zero comments.

---

## Project Structure

```
Day2(State&Events)/
├── index.html
├── package.json
├── vite.config.js
├── NOTES.md
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── components/
        ├── FilterBar.jsx    # Search input, status filter buttons, and priority sorting
        ├── TodoApp.jsx      # Top-level container holding state and business logic
        ├── TodoFooter.jsx   # Dynamic tasks counter and clear completed button
        ├── TodoForm.jsx     # Controlled inputs for task title and priority dropdown
        ├── TodoItem.jsx     # Individual task with checkbox, dot, badges, edit & delete
        └── TodoList.jsx     # Renders the collection of task items or empty state
```

---

## Component Overview

| Component | Responsibility | Props Received |
| :--- | :--- | :--- |
| `TodoApp` | State owner, derived calculations, handlers | None (Top-level) |
| `TodoForm` | Input for new task text & priority | `onAddTodo` |
| `FilterBar` | Search box, filter pills, priority sorter | `filter`, `onFilterChange`, `searchQuery`, `onSearchChange`, `sortByPriority`, `onSortChange` |
| `TodoList` | Renders list or empty placeholder | `todos`, `onToggle`, `onDelete`, `onEdit` |
| `TodoItem` | Checkbox, dot, text, edit mode, delete | `todo`, `onToggle`, `onDelete`, `onEdit` |
| `TodoFooter` | Tasks left counter, clear completed | `tasksLeft`, `completedCount`, `onClearCompleted` |

---

## How to Run

1. Open a terminal in this directory:
   ```bash
   cd "Week2/Day2(State&Events)"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Run linter:
   ```bash
   npm run lint
   ```
