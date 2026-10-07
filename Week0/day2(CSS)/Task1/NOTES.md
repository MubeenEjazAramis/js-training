## Short Notes (Things I learned)

### 1. Basic Selectors (The easy ones)
- **Tag name:** Just write the name directly like `plate`.
- **Class (`.`):** Dot for class like `.small`.
- **ID (`#`):** Hash for ID like `#fancy`.
- **Star (`*`):** Use this when you want to grab everything.

### 2. Combinators (The weird symbols)
- **Space:** `A B` means B is inside A, no matter how deep.
- **Arrow (`>`):** Must be a direct kid.
- **Plus (`+`):** Right next to it (like a neighbor).
- **Tilde (`~`):** All the sibling elements that come after it.

### 3. Those Colon Things (Pseudo-classes)
- **`:first-child` / `:last-child`:** First and last ones.
- **`:nth-child(n)`:** Pick by number. You can also write `even` or `odd` here.
- **`:first-of-type` / `:nth-of-type`:** Use this when looking for the same tags. (I always mix this up with nth-child).
- **`:empty`:** When there is absolutely nothing inside it.
- **`:not()`:** Put whatever you don't want inside the brackets.

### 4. Attribute Selectors (Square Brackets)
- **`[attribute]`:** Just the brackets.
- **`="value"`:** Exact spelling match.
- **`^="value"`:** Word starts with this.
- **`$="value"`:** Word ends with this.
- **`*="value"`:** Has this chunk of letters anywhere in it.

---

## Proof

**Screenshot:** 
(`Task#1.png`)