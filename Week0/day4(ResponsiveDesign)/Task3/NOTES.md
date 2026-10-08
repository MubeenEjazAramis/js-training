# Task 3: Fluid Headings and Images

## Objective
Use `clamp()` for headings and `max-width: 100%` for images.

---

## 1. How clamp() Works
`clamp(minimum, preferred, maximum)` takes 3 values:
- **Minimum:** The smallest size the font will ever be (e.g. `24px`).
- **Preferred:** The dynamic size based on viewport width (e.g. `5vw`).
- **Maximum:** The largest size the font will grow to (e.g. `42px`).

This makes text resize smoothly on every screen size without writing multiple media queries.

---

## 2. Responsive Images
```css
img {
  max-width: 100%;
  height: auto;
}
```
- `max-width: 100%` stops images from overflowing their parent container on small screens.
- `height: auto` keeps the original aspect ratio so the image doesn't stretch or squish.
