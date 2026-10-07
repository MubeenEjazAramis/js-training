# Task 2: CSS Specificity (Rough Notes)

## What is Specificity?
Sometimes we write multiple CSS rules for the same thing (like making a button red in one place and blue in another). Specificity is just the "power score" of a selector. The one with the higher score wins.

## The Score System (ID, Class, Element)
We count the score in 3 parts: `(0, 0, 0)`

1. **First number (IDs):** Count how many `#` are there. (Strongest)
2. **Second number (Classes):** Count how many `.` (classes) or pseudo-classes like `:hover` are there.
3. **Third number (Elements):** Count simple HTML tags like `p`, `div`, `a`.

*Note: Star `*` (universal selector) has 0 power.*

## My Assignment Selectors Breakdown

Here is the calculation for the 4 selectors in my task:

**1. `#nav .item a`**
- IDs: 1 (`#nav`)
- Classes: 1 (`.item`)
- Elements: 1 (`a`)
- **Score: (1, 1, 1)** -> *This is the most powerful because it has an ID.*

**2. `ul li:first-child`**
- IDs: 0
- Classes: 1 (`:first-child` counts as a class)
- Elements: 2 (`ul` and `li`)
- **Score: (0, 1, 2)**

**3. `.btn.primary`**
- IDs: 0
- Classes: 2 (`.btn` and `.primary`)
- Elements: 0
- **Score: (0, 2, 0)**

**4. `a:hover`**
- IDs: 0
- Classes: 1 (`:hover` counts as a class)
- Elements: 1 (`a`)
- **Score: (0, 1, 1)**

## Rules to remember for exams/interviews:
1. **ID is the boss:** Even 1 ID `(1,0,0)` will easily beat 20 classes `(0,20,0)`.
2. **Class beats tags:** A single class `(0,1,0)` beats any number of HTML tags.
3. **Tie-Breaker:** If two selectors have the exact same score, the one written at the VERY END of the CSS file wins. (Whatever comes last, wins).
4. **DevTools Trick:** If you inspect an element in Chrome and hover over the CSS rule, it automatically shows you this `(0, 0, 0)` score!