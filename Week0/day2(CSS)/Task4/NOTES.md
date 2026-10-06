# Task 4: CSS Units (My Revision Notes)

## The 4 Main CSS Units

### 1. `px` (Pixels)
- **What it is:** Fixed size. 
- **Rule:** 24px will always be exactly 24px. It doesn't care about the parent box.
- **When to use:** Good for border width or small icons.
- **Problem:** Don't use it for text. If a user zooms their browser font size for better reading, `px` won't change, which is bad.

### 2. `em`
- **What it is:** Multiplies based on the **Parent** font size.
- **Example:** If parent is 16px, `1.5em` means `1.5 * 16 = 24px`.
- **The Danger (Nesting):** If you put an `em` box inside another `em` box, they keep multiplying and the text gets randomly huge (like 1.2 * 1.2 * 1.2...).

### 3. `rem` (Root EM) - The Best One
- **What it is:** Multiplies based on the **Root** (`<html>` tag), which is usually 16px everywhere.
- **Why it's awesome:** It ignores the parent. `1.5rem` is always `24px` no matter where you put it on the page. It never multiplies by mistake.
- **Conclusion:** Always use `rem` for font sizes, margins, and padding!

### 4. `%` (Percentage)
- **For Fonts:** Acts exactly like `em` (looks at the parent font size).
- **For Width/Height:** Takes the percentage of the parent box's width or height. (e.g. `width: 50%` means half the size of the container).

---

## Quick Summary to remember:
- If parent size changes `em` and `%` will change.
- If parent size changes `px` and `rem` will NOT change.
- If root (`html`) size changes: all `rem` units scale proportionally (e.g. 1.5rem becomes 30px when html is 20px), while `px` remains fixed at 24px.
- For Responsive Text: Always use `rem`.