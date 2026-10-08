# Flexbox Froggy (Task 1) - Notes & Solutions

Game Link: [Flexbox Froggy](https://flexboxfroggy.com)

---

## 1. Core Concepts Learned

### A. Main Axis vs. Cross Axis
- **Main Axis:** The primary axis along which flex items are laid out. Defined by `flex-direction` (default is horizontal: `row`).
- **Cross Axis:** The axis perpendicular to the main axis (default is vertical).

---

### B. Container Properties (Parent)

#### 1. `justify-content` (Aligns items along the Main Axis)
- `flex-start`: Items align to the start of the container (default).
- `flex-end`: Items align to the end of the container.
- `center`: Items are centered.
- `space-between`: Items display with equal spacing between them; first and last touch the edges.
- `space-around`: Items display with equal space around them (half-size space at ends).
- `space-evenly`: Items display with identical space between every item and the container edges.

#### 2. `align-items` (Aligns items along the Cross Axis)
- `flex-start`: Items align to the top / start of the cross axis.
- `flex-end`: Items align to the bottom / end of the cross axis.
- `center`: Items are centered along the cross axis.
- `baseline`: Items align according to their text baselines.
- `stretch`: Items stretch to fill the container (default, if no height is set).

#### 3. `flex-direction` (Sets the direction of the Main Axis)
- `row`: Left-to-right (default).
- `row-reverse`: Right-to-left.
- `column`: Top-to-bottom (main axis becomes vertical!).
- `column-reverse`: Bottom-to-top.
> **Note:** When `flex-direction` is `column`, `justify-content` controls vertical alignment and `align-items` controls horizontal alignment!

#### 4. `flex-wrap` (Controls line wrapping)
- `nowrap`: All items try to fit on one line (default).
- `wrap`: Items wrap onto multiple lines if needed.
- `wrap-reverse`: Items wrap onto multiple lines in reverse order.

#### 5. `flex-flow` (Shorthand)
- Shorthand for `flex-direction` and `flex-wrap`.
- Example: `flex-flow: row wrap;` or `flex-flow: column-reverse wrap;`.

#### 6. `align-content` (Aligns wrapped rows along the Cross Axis)
- Only works when there are multiple lines (i.e. `flex-wrap: wrap`).
- Values: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `stretch`.

---

### C. Item Properties (Children)

#### 1. `order`
- Changes the visual display order without changing HTML structure.
- Default value is `0`.
- Accepts positive and negative integers (e.g. `order: -1;`, `order: 2;`).

#### 2. `align-self`
- Overrides `align-items` for a specific single flex item.
- Values: `flex-start`, `flex-end`, `center`, `baseline`, `stretch`.

---

## 2. Flexbox Froggy Level-by-Level Solutions

| Level | Goal / Concept | Solution |
| :---: | :--- | :--- |
| **1** | Move frog to pond (right) | `justify-content: flex-end;` |
| **2** | Center frogs | `justify-content: center;` |
| **3** | Equal space between | `justify-content: space-around;` |
| **4** | Push frogs to edges | `justify-content: space-between;` |
| **5** | Bottom align | `align-items: flex-end;` |
| **6** | Center horizontally & vertically | `justify-content: center;`<br>`align-items: center;` |
| **7** | Space around + bottom align | `justify-content: space-around;`<br>`align-items: flex-end;` |
| **8** | Reverse row direction | `flex-direction: row-reverse;` |
| **9** | Column direction | `flex-direction: column;` |
| **10** | Row reverse + left align | `flex-direction: row-reverse;`<br>`justify-content: flex-end;` |
| **11** | Column + bottom align | `flex-direction: column;`<br>`justify-content: flex-end;` |
| **12** | Column reverse + space between | `flex-direction: column-reverse;`<br>`justify-content: space-between;` |
| **13** | Column reverse + center | `flex-direction: row-reverse;`<br>`justify-content: center;`<br>`align-items: flex-end;` |
| **14** | Move specific item using order | `order: 1;` |
| **15** | Move red frog to front | `order: -1;` |
| **16** | Align single frog to bottom | `align-self: flex-end;` |
| **17** | Move order and align single frog | `order: 1;`<br>`align-self: flex-end;` |
| **18** | Allow items to wrap | `flex-wrap: wrap;` |
| **19** | Column wrap | `flex-direction: column;`<br>`flex-wrap: wrap;` |
| **20** | Shorthand flex-flow | `flex-flow: column wrap;` |
| **21** | Group multi-line items to top | `align-content: flex-start;` |
| **22** | Group multi-line items to bottom | `align-content: flex-end;` |
| **23** | Reverse column + center rows | `flex-direction: column-reverse;`<br>`align-content: center;` |
| **24** | Final Boss (Direction, wrap, align) | `flex-flow: column-reverse wrap-reverse;`<br>`justify-content: center;`<br>`align-content: space-between;` |

---

## 3. Proof

**Screenshot:** 
`Task#1.png` *(Attach screenshot after completing Level 24 on flexboxfroggy.com)*
