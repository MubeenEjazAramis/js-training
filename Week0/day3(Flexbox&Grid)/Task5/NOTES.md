# Task 5: 3-Card Row with Flex-Wrap & Gap - Revision Notes

## Objective
> **Requirement:** *"A row of 3 equal cards that wrap onto new lines on narrow screens, using flex-wrap and gap."*

---

## 1. The Core Flexbox Rules Used

### A. The Flex Container
```css
.cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
```
1. **`display: flex;`**: Placed child cards in a horizontal row by default.
2. **`flex-wrap: wrap;`**: By default, flex containers have `flex-wrap: nowrap`, which forces items to squash into one line and overflow. Setting it to `wrap` allows items to break onto a new line once they exceed the container width.
3. **`gap: 1.5rem;`**: Provides uniform spacing both horizontally (between columns) and vertically (between wrapped rows), with zero negative margin tricks required.

---

### B. Equal Card Sizing Formula
```css
.card {
  flex: 1 1 300px;
}
```
The `flex` shorthand combines three properties:
- **`flex-grow: 1`**: Cards will expand equally to consume any remaining free space in the row.
- **`flex-shrink: 1`**: Cards will shrink equally if space is tight.
- **`flex-basis: 300px`**: The starting ideal width of each card before growing or shrinking.

#### How this creates automatic responsiveness:
- **Desktop (> 1000px wide):** 3 cards easily fit side-by-side ($300\text{px} \times 3 + \text{gaps} \approx 950\text{px}$). Since `flex-grow: 1`, each card expands equally to take 33.3% of the row width.
- **Tablet (650px – 999px wide):** Container cannot fit 3 cards at 300px + gaps. The 3rd card automatically wraps to row 2 and stretches across the full width!
- **Mobile (< 650px wide):** All 3 cards wrap into a single-column layout (1 card per row).

---

## 2. Bonus Technique: Equal Height & Bottom Aligned Buttons
Inside each card:
```css
.card {
  display: flex;
  flex-direction: column;
}
.card-features {
  margin-top: auto; /* Pushes features and button to the very bottom */
}
```
Using nested flexbox with `margin-top: auto` guarantees that even if Card 1 has 2 lines of text and Card 2 has 5 lines of text, all buttons across all cards stay perfectly aligned at the bottom!
