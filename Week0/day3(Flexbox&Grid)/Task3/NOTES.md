# Task 3: Flexbox Navbar (Revision Notes)

## Objective
> **Requirement:** *"A navbar with the logo on the left and links on the right, all vertically centred, using flexbox."*

---

## 1. How Flexbox Solves This Problem

To create a classic navigation bar layout (Logo on the left, Links on the right, both centered vertically):

### A. The Container (`.navbar`)
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

1. **`display: flex;`**
   - Turns the `<nav>` into a flex container.
   - Its direct children (the `.logo` link and the `.nav-links` `<ul>`) are placed horizontally side-by-side in a row by default.

2. **`justify-content: space-between;`**
   - Distributes the remaining horizontal space evenly **between** the children.
   - The first child (`.logo`) is pushed all the way to the **left edge**.
   - The second child (`.nav-links`) is pushed all the way to the **right edge**.

3. **`align-items: center;`**
   - Controls alignment along the **Cross Axis** (vertical).
   - Keeps both the logo (which may have an icon/image) and text links perfectly aligned along their vertical center, even if their heights differ!

---

### B. The Links List (`.nav-links`) - Nested Flexbox
```css
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  list-style: none;
}
```

- By applying `display: flex` to the `<ul>`, all `<li>` items lay out horizontally.
- **`gap: 1.75rem;`**: Modern CSS property that adds spacing between each flex item cleanly without having to write `margin-right` or use `:last-child` hacks.

---

## 2. Semantic Structure & Best Practices
- Used `<header>` for the banner area and `<nav aria-label="Main navigation">` for navigation landmark.
- Used an unordered list `<ul>` with `<li>` tags for accessible screen reader navigation.
- Included `:hover` and `:focus-visible` states for keyboard accessibility and smooth user experience.

---

## 3. Why Flexbox vs. Floats?
| Feature | Old Floats (`float: left / right`) | Modern Flexbox (`display: flex`) |
| :--- | :--- | :--- |
| **Vertical Centering** | Extremely hard, requires manual padding/line-height hacks. | One line: `align-items: center;`. |
| **Spacing** | Needs `clear: both` or clearfix containers. | Clean and automatic with `justify-content: space-between`. |
| **Gaps** | Negative margins or `:last-child` overrides required. | Built-in with `gap`. |
