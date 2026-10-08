# Task 4: Centering a Card (Flexbox vs Grid) - Revision Notes

## Objective
> **Requirement:** *"Centre a card horizontally and vertically on the page in two ways: flexbox and grid."*

---

## 1. Method 1: Flexbox Centering

```css
.parent-container {
  display: flex;
  justify-content: center; /* Centers horizontally (Main Axis) */
  align-items: center;     /* Centers vertically (Cross Axis) */
  min-height: 100vh;       /* Container must have height to center vertically */
}
```

### How it works:
1. `display: flex;` activates Flexbox on the parent container.
2. `justify-content: center;` pushes all flex items to the middle of the main axis (left-to-right by default).
3. `align-items: center;` aligns items along the middle of the cross axis (top-to-bottom).
4. **Crucial rule:** The parent container MUST have a defined height (e.g., `min-height: 100vh` or fixed `height`), otherwise vertical centering won't be visible because the container will only be as tall as the card itself.

---

## 2. Method 2: CSS Grid Centering

```css
.parent-container {
  display: grid;
  place-items: center; /* Centers both horizontally & vertically in 1 line! */
  min-height: 100vh;
}
```

### How it works:
1. `display: grid;` activates CSS Grid.
2. `place-items: center;` is a shorthand for:
   - `align-items: center;` (vertical)
   - `justify-items: center;` (horizontal)
3. **Alternative Grid Trick:**
   ```css
   .parent-container { display: grid; }
   .card { margin: auto; } /* Auto margins inside grid center in both axes! */
   ```

---

## 3. Comparison Summary

| Feature | Method 1: Flexbox | Method 2: CSS Grid |
| :--- | :--- | :--- |
| **Lines of CSS** | 3 lines (`display`, `justify-content`, `align-items`) | 2 lines (`display: grid`, `place-items: center`) |
| **Shorthand available?** | No single shorthand property | Yes: `place-items: center` |
| **Best used when:** | Layout is 1-dimensional (single row or column of items) | Layout is 2-dimensional or centering a single element |
