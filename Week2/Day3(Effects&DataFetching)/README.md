# Week 2 Day 3: Effects and Data Fetching (Recipe Search App)

A modern, responsive Recipe Search web application built with React 19, Vite, and [TheMealDB](https://www.themealdb.com/api.php) open API. Demonstrates side-effect synchronization, debounced data fetching, race condition prevention, and accessible modals.

---

## Features Implemented

1. **Debounced Search (500ms):**
   - Live query typing triggers an automatic debounce timer.
   - The effect sets up a `setTimeout` for 500 ms; any keystroke resets the timer via `clearTimeout` in the cleanup function.
   - Searching only fires when the user pauses typing, reducing unnecessary network calls.
   - The `isDebouncing` flag is dynamically derived during render, avoiding redundant cascading effect renders.

2. **Race Condition Prevention:**
   - Network requests can return out-of-order due to variable latency.
   - Uses the official React `ignore` flag pattern paired with `AbortController` in `useEffect` cleanup.
   - Guarantees an older, slower network response will never overwrite newer results.

3. **Dynamic Category Filter:**
   - On initial mount, fetches the available meal categories from `list.php?c=list`.
   - Populates an interactive category selector dropdown.
   - Enables filtering recipes by category both independently and alongside search queries.

4. **Rich Results Grid:**
   - Responsive CSS grid displaying recipe cards.
   - Each card displays high-resolution thumbnail (`strMealThumb`), meal title (`strMeal`), category badge (`strCategory`), and cuisine area badge (`strArea`).

5. **Recipe Detail Modal / Panel:**
   - Clicking any recipe card opens a full modal view.
   - Fetches complete recipe details using `lookup.php?i={id}` with its own isolated loading and cleanup handlers.
   - Dynamically parses and pairs all ingredients (`strIngredient1..20`) with their corresponding measurements (`strMeasure1..20`).
   - Displays formatted cooking instructions, category and area tags, and direct external links to YouTube tutorials and sources.
   - Supports keyboard accessibility: pressing `Escape` closes the modal, cleaned up via `removeEventListener`.

6. **Comprehensive UI States:**
   - **Loading Skeletons:** Animated shimmering placeholder cards while awaiting API responses.
   - **Empty State:** Helpful graphic and instructions when no recipes match the query or selected category, with a quick reset button.
   - **Error Handling with Retry:** Friendly error banner with a dedicated "Retry Search" button to recover from network drops.

---

## Project Structure

```
Day3(Effects&DataFetching)/
├── index.html
├── package.json
├── vite.config.js
├── .oxlintrc.json
├── NOTES.md
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── components/
        ├── CategoryFilter.jsx       # Fetches categories from API & manages category dropdown
        ├── EmptyState.jsx           # Displayed when 0 recipes match search/filter
        ├── ErrorMessage.jsx         # Network error banner with Retry action button
        ├── Header.jsx               # App navigation bar with live API status
        ├── LoadingSkeleton.jsx      # Shimmer skeleton cards during data fetching
        ├── RecipeCard.jsx           # Individual meal card with image, badges, & trigger
        ├── RecipeDetailModal.jsx    # Detail dialog with ingredients, measures & instructions
        ├── RecipeGrid.jsx           # CSS grid container mapping recipe results
        └── SearchBar.jsx            # Controlled input with debouncing indicator & quick tags
```

---

## Component Overview

| Component | Responsibility | Props Received |
| :--- | :--- | :--- |
| `App` | Root container managing queries, category, results, error, and modal states | None |
| `Header` | Renders branding, title, and live API indicator | None |
| `SearchBar` | Search input, clear button, debounce status, and quick search pills | `searchTerm`, `onSearchChange`, `onClear`, `isDebouncing`, `onSelectTag`, `activeTag` |
| `CategoryFilter` | Fetches categories from `list.php?c=list` and controls category selection | `selectedCategory`, `onSelectCategory` |
| `RecipeGrid` | Renders responsive grid of recipe cards | `recipes`, `onSelectRecipe` |
| `RecipeCard` | Displays meal image, title, category, and cuisine tags | `recipe`, `onSelectRecipe` |
| `LoadingSkeleton` | Displays 8 animated shimmer placeholder cards | None |
| `EmptyState` | Displays "No recipes found" message and reset filters button | `query`, `selectedCategory`, `onReset` |
| `ErrorMessage` | Displays network failure warning and "Retry Search" button | `message`, `onRetry` |
| `RecipeDetailModal`| Fetches recipe by ID (`lookup.php?i=`), displays ingredients and instructions | `mealId`, `onClose` |

---

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd "Week2/Day3(Effects&DataFetching)"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run lint checks:
   ```bash
   npm run lint
   ```
