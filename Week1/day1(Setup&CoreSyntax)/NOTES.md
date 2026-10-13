# Day 1: Setup and Core Syntax (Notes)

## Stand-up Questions

### 1. `let` vs `const`, and when to use each?
- **`const`**: Cannot be reassigned after its initial value is given. It is block-scoped.
  - *When to use:* Always use `const` by default for variables, functions, and objects that will not be reassigned.
- **`let`**: Can be reassigned to a new value later. It is also block-scoped.
  - *When to use:* Use `let` only when the value must change, such as loop counters (`for (let i = 0; ...)`) or accumulators (`let sum = 0`).

---

### 2. Why is `"5" + 3` `"53"` but `"5" - 3` is `2`?
- **`+` operator (Addition or Concatenation):**
  - In JavaScript, `+` is overloaded. If either operand is a string, JavaScript converts the other operand to a string as well and joins them together (concatenation). So `"5" + 3` becomes `"5" + "3"` which results in `"53"`.
- **`-` operator (Subtraction only):**
  - The minus sign `-` does not have a string meaning; it only performs mathematical subtraction. JavaScript automatically converts the string `"5"` into the number `5` and subtracts `3`, resulting in the number `2`.

---

### 3. `==` vs `===`?
- **`==` (Loose Equality / Abstract Equality):**
  - Compares two values with automatic type conversion (type coercion). If the types are different, JavaScript converts one or both before comparing.
  - Example: `"5" == 5` is `true`.
- **`===` (Strict Equality):**
  - Compares both the value and the type without any conversion. If the types are different, it immediately returns `false`.
  - Example: `"5" === 5` is `false` (string vs number).
  - *Rule:* Always use `===` to prevent unexpected bugs.
