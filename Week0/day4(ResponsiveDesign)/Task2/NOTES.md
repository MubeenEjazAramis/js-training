# Task 2: Mobile Navigation (CSS-Only)

## Objective
Create a CSS-only collapsible menu using a checkbox.

---

## How it works (Checkbox Hack)
1. An `<input type="checkbox" id="toggle">` holds the state (open/close).
2. We hide the checkbox with `display: none;`.
3. A `<label for="toggle">` shows the hamburger icon (&#9776;). Clicking this label checks or unchecks the hidden checkbox.
4. Using the sibling selector:
   ```css
   #toggle:checked ~ .nav {
     display: flex;
   }
   ```
   When the checkbox is checked, the `.nav` menu displays.

---

## On Desktop (min-width: 768px)
- The hamburger label is hidden (`display: none;`).
- The `.nav` is always visible as a horizontal flex row (`display: flex; flex-direction: row;`).
