# Grid Garden (Task 2) - Notes & Solutions

Game Link: [Grid Garden](https://cssgridgarden.com)

---

## 1. Core Concepts Learned

### A. Grid Container vs Grid Items
- **Grid Container:** The parent element (`display: grid;`) defines the grid template (columns, rows, gap).
- **Grid Items:** The direct children placed on grid lines or inside grid areas.

---

### B. Grid Lines (Counting & Coordinates)
- Grid lines are 1-based index numbers starting from the top-left edge:
  - If a grid has 5 columns, there are **6 vertical grid lines** (`1` to `6`).
  - If a grid has 5 rows, there are **6 horizontal grid lines** (`1` to `6`).
- **Negative line numbers:** Count backwards from the right/bottom edge (`-1` is the last line, `-2` is the second last).

---

### C. Grid Item Properties (Positioning Children)

#### 1. `grid-column-start` & `grid-column-end`
- Sets which vertical grid line an item starts and ends at.
- Example: `grid-column-start: 3;` starts at vertical line 3.
- Example: `grid-column-end: -1;` stretches all the way to the rightmost edge.

#### 2. The `span` Keyword
- Tells the item to span across a certain number of columns or rows rather than giving an exact line number.
- Example: `grid-column-end: span 2;` (occupies 2 columns from start).
- Example: `grid-column-start: span 3;`

#### 3. `grid-column` (Shorthand)
- Syntax: `grid-column: <start-line> / <end-line>;`
- Example: `grid-column: 2 / 5;` or `grid-column: 2 / span 3;`.

#### 4. `grid-row-start`, `grid-row-end`, & `grid-row`
- Controls horizontal positioning across rows.
- Syntax: `grid-row: <start-row> / <end-row>;`
- Example: `grid-row: 3 / 6;`

#### 5. `grid-area` (Full Position Shorthand)
- Shorthand for all 4 values in this exact order:
  `grid-area: <row-start> / <col-start> / <row-end> / <col-end>;`
- Example: `grid-area: 1 / 2 / 4 / 6;`

#### 6. `order`
- Reorders items visually without modifying the DOM.
- Default is `0`. Negative numbers move items earlier, positive numbers move items later.

---

### D. Grid Container Properties (Sizing & Templates)

#### 1. `grid-template-columns`
- Defines the number and widths of columns.
- Units allowed: `px`, `%`, `em`, `rem`, and `fr` (fractional units).
- Example: `grid-template-columns: 100px 3em 40%;`

#### 2. The `repeat()` Function
- Avoids repeating values.
- Syntax: `repeat(<count>, <size>);`
- Example: `repeat(5, 20%)` or `repeat(4, 1fr)`.

#### 3. Fractional Units (`fr`)
- Represents a fraction of the available space inside the grid container.
- Example: `grid-template-columns: 1fr 3fr;` (total 4 parts: 1st column gets 25%, 2nd gets 75%).

#### 4. `grid-template-rows`
- Defines the heights of each row.
- Example: `grid-template-rows: 50px 1fr 2fr;`

#### 5. `grid-template` (Shorthand)
- Sets both rows and columns at once.
- Syntax: `grid-template: <rows> / <columns>;`
- Example: `grid-template: 60% / 200px;`
- Example: `grid-template: 1fr 50px / 1fr 4fr;`

---

## 2. Grid Garden Level-by-Level Solutions

| Level | Target / Concept | Solution |
| :---: | :--- | :--- |
| **1** | Water column 3 | `grid-column-start: 3;` |
| **2** | Water column 5 | `grid-column-start: 5;` |
| **3** | Water cols 1 to 3 | `grid-column-end: 4;` |
| **4** | Water col 1 only | `grid-column-end: 2;` |
| **5** | Negative line numbers | `grid-column-end: -2;` |
| **6** | Start from right | `grid-column-start: -3;` |
| **7** | Use span to cover 2 cols | `grid-column-end: span 2;` |
| **8** | Span 5 cols | `grid-column-end: span 5;` |
| **9** | Start span 3 cols | `grid-column-start: span 3;` |
| **10** | `grid-column` shorthand | `grid-column: 4 / 6;` |
| **11** | Shorthand with span | `grid-column: 2 / span 3;` |
| **12** | Row positioning | `grid-row-start: 3;` |
| **13** | `grid-row` shorthand | `grid-row: 3 / 6;` |
| **14** | Both column and row | `grid-column: 2;`<br>`grid-row: 5;` |
| **15** | Span columns and rows | `grid-column: 2 / 6;`<br>`grid-row: 1 / 6;` |
| **16** | `grid-area` shorthand | `grid-area: 1 / 2 / 4 / 6;` |
| **17** | `grid-area` shorthand | `grid-area: 2 / 3 / 5 / 6;` |
| **18** | Reorder with order | `order: 1;` |
| **19** | Negative order | `order: -1;` |
| **20** | `grid-template-columns` percent | `grid-template-columns: 50%;` |
| **21** | `repeat()` function | `grid-template-columns: repeat(8, 12.5%);` |
| **22** | Mixed units (px, em, %) | `grid-template-columns: 100px 3em 40%;` |
| **23** | `fr` unit | `grid-template-columns: 1fr 5fr;` |
| **24** | Mixed px and fr | `grid-template-columns: 50px 1fr 1fr 1fr 50px;` |
| **25** | Custom proportions | `grid-template-columns: 75px 3fr 2fr;` |
| **26** | `grid-template-rows` | `grid-template-rows: 50px 0 0 0 0;` |
| **27** | `grid-template` shorthand | `grid-template: 60% / 200px;` |
| **28** | Full template shorthand | `grid-template: 1fr 50px / 1fr 4fr;` |

---

## 3. Proof

**Screenshot:** 
`image.png` *(Attach screenshot after completing Level 28 on cssgridgarden.com)*
