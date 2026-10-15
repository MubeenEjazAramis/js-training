# Week 2 Day 1: React Fundamentals (Product Catalog)

A modern, responsive product catalog built with React functional components and props based on the Week 1 products dataset.

## Features Implemented

- **Component Hierarchy:** Modular architecture with `Header`, `ProductGrid`, `ProductCard`, `Price`, `Badge`, `Rating`, and `Footer`.
- **Category Grouping:** Products are organized into sections dynamically based on categories (`electronics`, `furniture`).
- **Conditional Badges:**
  - `In stock` badge (green) when stock > 0.
  - `Sold out` badge (red) and faded appearance when stock is 0.
  - `Top rated` badge for products with ratings of 4.5 and above.
- **Star Rating:** Visual star rendering based on numerical product rating.
- **Price Formatting:** Formatted via `Intl.NumberFormat` in Pakistani Rupee format (e.g. `Rs 1,200`).
- **Responsive Layout:** 1 column on mobile screens and 3 columns on desktop screens.
- **Component File Limits:** Every component file is strictly kept well below the 30–40 line limit.
- **Clean Code:** Clean and beginner-friendly syntax with zero comments in component files.

---

## Project Structure

```
Day1(React&Components&Props)/
├── index.html
├── package.json
├── vite.config.js
├── NOTES.md
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── Badge.jsx         # Stock & Top-rated status badge
    │   ├── Footer.jsx        # App footer
    │   ├── Header.jsx        # App header & branding
    │   ├── Price.jsx         # Currency price formatter
    │   ├── ProductCard.jsx   # Card combining image, badges, rating, price
    │   ├── ProductGrid.jsx   # Category header & responsive grid
    │   └── Rating.jsx        # Star rating renderer
    ├── data/
    │   └── products.js       # Week 1 products with image & rating
    └── exercises/
        ├── Avatar.jsx        # Round avatar exercise
        ├── Badge.jsx         # Stock badge exercise
        ├── Card.jsx          # Bordered card with children
        ├── ExerciseSuite.jsx # Combined test suite for exercises
        ├── FixJsx.jsx        # Converted valid JSX markup
        ├── Greeting.jsx      # Name greeting exercise
        ├── Price.jsx         # Price exercise
        └── UserList.jsx      # 5 users list with id keys
```

---

## Line Counts by Component

| Component | Lines of Code | Status |
| :--- | :--- | :--- |
| `src/components/Header.jsx` | 10 lines | Passed (< 40 lines) |
| `src/components/Footer.jsx` | 9 lines | Passed (< 40 lines) |
| `src/components/Price.jsx` | 9 lines | Passed (< 40 lines) |
| `src/components/Badge.jsx` | 11 lines | Passed (< 40 lines) |
| `src/components/Rating.jsx` | 11 lines | Passed (< 40 lines) |
| `src/components/ProductGrid.jsx` | 14 lines | Passed (< 40 lines) |
| `src/components/ProductCard.jsx` | 28 lines | Passed (< 40 lines) |
| `src/App.jsx` | 24 lines | Passed (< 40 lines) |

---

## How to Run

1. Open a terminal in this directory:
   ```bash
   cd "Week2/Day1(React&Components&Props)"
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
