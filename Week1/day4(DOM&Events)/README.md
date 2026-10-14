# Week 1 Day 4: The DOM, Events and Forms (To-Do App)

Build task for Week 1 Day 4.

## Structure

```
Week1/day4(DOM&Events)/
├── index.html     # Root redirect to todo app
├── NOTES.md       # Stand-up questions and answers
├── README.md      # Documentation and overview
└── todo/
    ├── app.js     # Plain Vanilla JavaScript logic
    ├── index.html # Semantic HTML structure
    └── style.css  # Pure Vanilla CSS styling
```

## Features Implemented

- **Task Input**: Add task with Enter key or clicking the "Add Task" button (empty input is ignored).
- **Task Controls**: Each task has a checkbox, task text, and a delete button; ticked tasks are struck through.
- **Filter Tabs**: Filter buttons for `All`, `Active`, and `Done` with active tab highlighted.
- **Footer**: Dynamic counter showing active tasks left (e.g., "3 tasks left") and a "Clear completed" button.
- **Persistence**: All tasks are stored in `localStorage` and automatically restored on page refresh.
- **State Architecture**: All tasks are kept in a single `todos` array, and a single `render()` function redraws the list from it.
- **Stretch Feature**: Double-click any task text to edit inline; press `Enter` or click outside to save, or `Escape` to cancel.
- **Event Bubbling & Delegation**: List actions (toggle, delete, edit) use event delegation on the parent `<ul>` container.
- **No Page Reload**: Form submission intercepts `e.preventDefault()`.

## How to Run

Open `todo/index.html` directly in any web browser, or use a local development server:

```bash
# Example using simple HTTP server
npx serve "Week1/day4(DOM&Events)/todo"
```
