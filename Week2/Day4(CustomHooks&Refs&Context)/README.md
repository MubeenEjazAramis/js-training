# Week 2 Day 4: Custom Hooks, Refs and Context (Recipe App v2)

Welcome to the **Week 2 Day 4** milestone of the JavaScript, React & Next.js training program. This day focuses on mastering advanced React state patterns, imperative DOM access with `useRef`, custom hooks extraction, deep state propagation using Context API, and state machine design with `useReducer`.

---

## 🚀 What Was Built

### 1. Recipe Search App (Version 2)
Refactored the Day 3 Recipe Search application into a scalable, modular architecture with zero prop drilling:
- **`useFetch(url)` Hook:** Extracted data fetching logic into a reusable custom hook returning `{ data, loading, error, refetch }` with auto-abort and race condition prevention. Used in 3 components (`App`, `CategoryFilter`, and `RecipeDetailModal`).
- **`useDebounce(value, 500)` Hook:** Powering the search bar to avoid redundant API queries while the user is typing.
- **`ThemeContext`:** Provides light and dark mode toggling directly in the header, with user preference remembered across sessions via `useLocalStorage`.
- **`FavoritesContext`:** Allows favoriting recipes with a single heart click on any recipe card or detail modal. Features a sliding Favorites panel listing saved recipes and survives page reloads.
- **Eliminated Prop Drilling:** Favorites state and theme state are consumed directly by child components without passing props across intermediate layers.

### 2. Interactive Practice Lab (All 6 Tasks)
An interactive evaluation suite built into the application allows testing each assigned practice task:
- **Task 1 — Auto-Focus `useRef`:** Automatically focuses the search input on mount via `inputRef.current.focus()`.
- **Task 2 — Stopwatch Timer Ref:** Precision stopwatch storing the active `setInterval` ID in a `useRef` to prevent unnecessary component re-renders.
- **Task 3 — `useToggle` Custom Hook:** Returns `[value, toggle]` for clean boolean state toggling.
- **Task 4 — `useLocalStorage` Custom Hook:** Syncs state with browser `localStorage`, featuring safe `try / catch` fallback when dealing with corrupted or invalid JSON.
- **Task 5 — `useWindowWidth` Custom Hook:** Listens to window resize events and properly cleans up event listeners on unmount.
- **Task 6 — To-Do State with `useReducer`:** Re-architected to-do state into a pure reducer handling `added`, `toggled`, `deleted`, and `cleared` actions.

---

## 📁 Project Directory Structure

```text
Week2/Day4(CustomHooks&Refs&Context)/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── .oxlintrc.json
├── NOTES.md                     # Concept summaries & stand-up Q&A
├── README.md                    # Project documentation
└── src/
    ├── main.jsx                 # App root with ThemeProvider & FavoritesProvider
    ├── App.jsx                  # Main application orchestrator
    ├── index.css                # Adaptive light & dark mode design system
    ├── hooks/
    │   ├── useDebounce.js       # Search input debouncing hook
    │   ├── useFetch.js          # Reusable data fetcher with abort & refetch
    │   ├── useLocalStorage.js   # Safe persistent localStorage hook
    │   ├── useToggle.js         # Boolean toggle hook
    │   └── useWindowWidth.js    # Window resize tracker with cleanup
    ├── context/
    │   ├── ThemeContext.jsx     # Global theme provider (Light / Dark)
    │   └── FavoritesContext.jsx # Global favorites state & drawer provider
    ├── practice/
    │   ├── PracticeDashboard.jsx # Tabbed testbed for all 6 tasks
    │   ├── Task1AutoFocus.jsx   # Input auto-focus using useRef
    │   ├── Task2Stopwatch.jsx   # Stopwatch storing timer in useRef
    │   ├── Task3ToggleDemo.jsx  # useToggle hook demo
    │   ├── Task4LocalStorageDemo.jsx # useLocalStorage with corrupt JSON test
    │   ├── Task5WindowWidthDemo.jsx  # Window width listener with unmount test
    │   ├── Task6TodoReducer.jsx # To-do app state managed with useReducer
    │   └── todoReducer.js       # Pure reducer function for to-do items
    └── components/
        ├── Header.jsx           # App header with theme & favorites controls
        ├── SearchBar.jsx        # Search input with typing indicator & chips
        ├── CategoryFilter.jsx   # Dropdown powered by useFetch
        ├── RecipeGrid.jsx       # Grid layout for recipe cards
        ├── RecipeCard.jsx       # Card with heart favorite button
        ├── RecipeDetailModal.jsx# Detail modal powered by useFetch
        ├── FavoritesDrawer.jsx  # Slide-out drawer displaying favorited meals
        ├── LoadingSkeleton.jsx  # Shimmering loading skeletons
        ├── EmptyState.jsx       # Friendly no-results fallback
        ├── ErrorMessage.jsx     # Network error display with Retry button
        └── Footer.jsx           # Application footer
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Run Code Linter
```bash
npm run lint
```

---

## 🎓 Stand-Up Questions Covered in `NOTES.md`
1. **`useRef` vs `useState`:** Which triggers a re-render and when to use each.
2. **Custom Hooks:** What makes a function a custom hook and how state isolation works.
3. **Context API Limitations:** When context is the wrong tool (high frequency state, simple prop passing, independent component reuse).
