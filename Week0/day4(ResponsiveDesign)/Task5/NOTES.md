# Task 5: Subtle Hover Transitions

## Objective
Add subtle hover transitions to buttons and cards.

---

## How it works
1. **Transition Property:**
   ```css
   transition: transform 0.3s ease, box-shadow 0.3s ease;
   ```
   This tells the browser to animate changes smoothly over `0.3` seconds instead of changing instantly.

2. **Hover Effect:**
   ```css
   .card:hover {
     transform: translateY(-5px);
     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
   }
   ```
   - `transform: translateY(-5px)` lifts the card up slightly.
   - `box-shadow` creates depth and elevation.
   - Using `transform` is fast and smooth because it is handled by the GPU.
