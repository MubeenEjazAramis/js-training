# Task 4: Dark Mode with prefers-color-scheme

## Objective
Use `prefers-color-scheme` to swap CSS custom properties.

---

## How it works
1. We define CSS custom properties (variables) on `:root` for light mode:
   ```css
   :root {
     --bg: #f8fafc;
     --card: #ffffff;
     --text: #1e293b;
   }
   ```
2. In `@media (prefers-color-scheme: dark)`, we swap only the variable values:
   ```css
   @media (prefers-color-scheme: dark) {
     :root {
       --bg: #0f172a;
       --card: #1e293b;
       --text: #f8fafc;
     }
   }
   ```
3. Because all HTML elements use `var(--bg)` and `var(--text)`, they change colors automatically based on the user's OS settings without needing any JavaScript.
