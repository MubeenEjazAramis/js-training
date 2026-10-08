# Task 7: Page Layout with `grid-template-areas` - Revision Notes

## Objective
> **Requirement:** *"A page layout with header, sidebar, main and footer using grid-template-areas."*

---

## 1. How `grid-template-areas` Works

`grid-template-areas` lets you design your page layout visually by typing out names in strings that look like a layout blueprint (ASCII art):

```css
.layout-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
}
```

### Then, assign each element to its name:
```css
.layout-header  { grid-area: header; }
.layout-sidebar { grid-area: sidebar; }
.layout-main    { grid-area: main; }
.layout-footer  { grid-area: footer; }
```

---

## 2. Visual Layout Breakdown

```text
+-----------------------------------------------------------+
|                          HEADER                           |  (spans 2 columns)
+-----------------------------+-----------------------------+
|                             |                             |
|           SIDEBAR           |            MAIN             |
|           (240px)           |            (1fr)            |
|                             |                             |
+-----------------------------+-----------------------------+
|                          FOOTER                           |  (spans 2 columns)
+-----------------------------------------------------------+
```

---

## 3. Strict Rules for `grid-template-areas`

1. **Every cell must be defined:** Every row string must contain the exact same number of column cell names (e.g., both columns 1 and 2 in every row).
2. **Areas must be rectangular:** An area cannot form an L-shape or T-shape. It must be a continuous rectangle or square.
3. **Empty cells use a period (`.`):** If you want a cell to stay empty, use a dot like `"header ."` or `". main"`.
4. **Spanning is intuitive:** Notice how `"header header"` spans both columns 1 and 2 simply by repeating the name! No need to calculate `grid-column: 1 / 3;`.
