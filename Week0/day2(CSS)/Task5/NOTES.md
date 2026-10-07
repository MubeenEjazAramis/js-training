# Task 5: Margin Collapse (My Notes)

## What is Margin Collapse?
Normally, if you put two boxes together, their margins should add up. But in CSS, Top and Bottom margins don't work like that! Instead of adding up, the bigger margin just swallows the smaller one. 

**My Test Example:**
- Box 1 has `margin-bottom: 40px`.
- Box 2 has `margin-top: 25px`.
- The gap between them is **40px** (not 65px). The 40px wins because it's the bigger number.

## 3 Simple Rules to Remember:

1. **Top and Bottom:** They collapse (the bigger margin wins).
2. **Left and Right:** They NEVER collapse. 20px + 20px will exactly be 40px gap.
3. **Flexbox saves the day:** If you use `display: flex`, margin collapse completely stops happening. (Thank God for Flexbox!).

## Parent-Child Margin Bug
Sometimes if you give a top-margin to a child div, it pushes the whole Parent box down instead of moving inside it. 
**Quick Fix:** Just give the Parent container a `border: 1px solid transparent` or a little bit of padding, and the child's margin will stay safely inside.

## DevTools Check
If you inspect (F12) the boxes in Chrome, you will see the orange color (which represents margin) of Box 2 overlapping inside the orange color of Box 1. It looks weird, but it's not a bug, it's just how CSS works.