# Task 8: Sticky Header & Absolute Badge - Revision Notes

## Objective
> **Requirement:** *"A sticky header and a badge positioned in the corner of a card with position: absolute."*

---

## 1. Requirement 1: The Sticky Header

```css
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
```

### How `position: sticky` works:
- It is a hybrid of `relative` and `fixed`.
- **Before scrolling:** It sits in the normal document flow like `position: relative`.
- **During scroll:** Once its top edge reaches `top: 0` relative to the viewport, it sticks in place like `position: fixed`.
- **Scroll ends in container:** When the user scrolls past its parent container, it scrolls out of view naturally with the parent.

### Important Sticky Gotchas:
1. You **must** provide at least one threshold (like `top: 0`, `bottom: 0`, etc.) or it will not stick.
2. If any parent container has `overflow: hidden;`, `overflow: auto;`, or `overflow: scroll;`, it breaks the sticky context!

---

## 2. Requirement 2: Absolute Corner Badge

```css
/* 1. Parent Card MUST be relative */
.card {
  position: relative;
}

/* 2. Badge positioned absolutely inside the card */
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
}
```

### Why is `position: relative` required on the parent?
- An element with `position: absolute` is taken completely out of normal flow and looks up the DOM tree for the nearest ancestor with a position other than `static`.
- If `.card` has `position: relative;`, the badge coordinates (`top`, `right`, `bottom`, `left`) are calculated **relative to that specific card**.
- If you forget `position: relative;` on `.card`, the badge will jump all the way up to the top-right corner of the entire `<body>` / viewport!

---

## 3. Quick Reference: CSS `position` Values

| Position Value | In Normal Flow? | Relative to what? | Common Use Case |
| :--- | :---: | :--- | :--- |
| `static` (default) | Yes | Normal document flow | Default standard HTML elements |
| `relative` | Yes | Its own original position | Offset an element slightly, or serve as anchor for absolute children |
| `absolute` | No | Nearest positioned ancestor (`relative`/`absolute`/`fixed`) | Corner badges, tooltips, modal close (X) buttons |
| `fixed` | No | The browser viewport | Floating action buttons, chat widgets, persistent cookie banners |
| `sticky` | Yes (until scroll) | Its scrolling parent / viewport | Sticky navigation headers, table column headers |
