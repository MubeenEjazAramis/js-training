# Task 1: Mobile-First Layout

## Objective
Set small-screen base styles and media queries around 768px and 1024px.

---

## What is Mobile-First?
Mobile-first means writing base CSS for small screens (mobile) first, without using media queries. Then we add `@media (min-width: ...)` to change the layout for bigger screens like tablets and desktops.

### Breakpoints Used:
1. **Base (Mobile < 768px):** Single column layout (`grid-template-columns: 1fr`).
2. **Tablet (min-width: 768px):** 2-column layout (`grid-template-columns: repeat(2, 1fr)`).
3. **Desktop (min-width: 1024px):** 3-column layout (`grid-template-columns: repeat(3, 1fr)`).

---

## Why min-width?
With `min-width`, styles apply when the screen is *at least* that wide. The browser starts with simple mobile styles and adds desktop styles only when screen size grows.
