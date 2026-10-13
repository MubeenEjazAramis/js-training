# Task 6: Viewport Testing (DevTools)

## Objective
Test at 375px, 768px and 1440px in DevTools. Fix horizontal scrolling.

---

## 1. How to Test in DevTools
1. Press `F12` or right click &rarr; Inspect.
2. Click the **Toggle Device Toolbar** icon (`Ctrl + Shift + M`).
3. Set width to:
   - **375px** (Mobile)
   - **768px** (Tablet)
   - **1440px** (Desktop)

---

## 2. How to Prevent Horizontal Scrolling
- Always use `box-sizing: border-box;` on all elements.
- Never use fixed widths like `width: 800px;`. Use `max-width: 800px; width: 100%;`.
- Add `max-width: 100%;` on images.
- Use `overflow-x: hidden;` on `body` as a safety net.
