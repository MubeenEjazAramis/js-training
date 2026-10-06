# Task 6: Button States (My Revision Notes)

## The 3 Main Button States

### 1. Hover (`:hover`)
- **What it does:** Changes the design when you put the mouse pointer over the button.
- **Why use it:** It tells the user "Hey, this is clickable!"
- *Note:* Touch screens (like mobile phones) don't have a mouse pointer, so hover doesn't really matter on phones.

### 2. Focus (`:focus-visible`) - The Smart Ring
- **What it does:** Shows a border/outline around the button when someone uses the keyboard.
- **How to test:** Click anywhere on the white screen and press the `Tab` key.
- **Why it's awesome:** In the past, people used `:focus`, which showed an ugly ring even when you clicked with a mouse. `:focus-visible` is super smart! It ONLY shows the ring if you are navigating with the keyboard. 

### 3. Disabled (`:disabled`)
- **What it does:** Grays out the button so you can't click it (like when a form is still submitting and you want the user to wait).
- **Tricks to style it:**
  - Lower the `opacity` to make it look faded out.
  - Use `cursor: not-allowed;` so the mouse shows a stop sign.
  - *Magic feature:* The browser automatically skips disabled buttons when you press the `Tab` key.

## Quick Keyboard Test:
If you open my HTML page and press `Tab`, the blue focus ring will jump to the "Save" button, then to the "Cancel" button, but it will completely ignore the "Submitting..." button because disabled elements don't get focused!