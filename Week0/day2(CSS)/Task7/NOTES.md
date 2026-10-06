# Task 7: CSS Variables (My Notes)

## What are CSS Variables?
Instead of copying and pasting the same color code like `#0284c7` everywhere, we can save it in a word (variable) like `--main-color`. Then we just use that word everywhere.

## Why are they so useful?
1. **Time Saver:** If the client says "Change the blue color to green", I don't have to find and replace it in 100 different lines. I just change it in ONE place, and the whole website updates instantly.
2. **Easy to Read:** `background-color: var(--main-color)` makes much more sense than reading random hex codes.

## How to create them (`:root`)
We create them inside `:root`. `:root` is basically the very top level of the document (even above the `body` tag). Writing them here means the whole HTML page can use them.
*Note: Always start the name with two dashes (`--`).*

```css
:root {
  --main-color: blue;
  --space-big: 20px;
}