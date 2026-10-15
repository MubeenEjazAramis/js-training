# Day 5: Async JavaScript (Notes & Evaluation Prep)

## Core Concepts & Questions

### 1. Callbacks vs. Promises vs. Async/Await
- **Callbacks:** The traditional way to handle asynchronous code by passing a function as an argument. Nested callbacks lead to "callback hell" or the "pyramid of doom" which is hard to read and handle errors for.
- **Promises:** An object representing the eventual completion or failure of an asynchronous operation with three states: *pending*, *fulfilled*, or *rejected*. Avoids deep nesting using `.then()` and `.catch()`.
- **Async/Await:** Syntactic sugar built on top of Promises. It allows us to write asynchronous code that looks and reads like synchronous code, making control flow and error handling much simpler.

---

### 2. Why does `fetch()` require two `await` expressions?
1. **First `await fetch(url)`:** Waits for the HTTP response headers to arrive from the server. At this point, we can check `response.ok` or `response.status`.
2. **Second `await response.json()`:** Waits for the response body stream to finish downloading and parses the raw text into a JavaScript object.

---

### 3. How does `fetch()` handle errors (404 vs Network Failure)?
- `fetch()` **only rejects** (triggers `catch`) when there is a network dropout, DNS failure, or the request was blocked.
- For HTTP error statuses like `404 Not Found` or `500 Internal Server Error`, the promise still **resolves successfully**.
- Therefore, we must manually check:
  ```javascript
  if (response.status === 404) {
    // User not found
  }
  if (!response.ok) {
    // Other HTTP error
  }
  ```

---

### 4. Why use `try / catch / finally`?
- **`try` block:** Houses our asynchronous requests (`await fetch(...)`).
- **`catch` block:** Captures network errors or JSON parsing issues smoothly without crashing the app.
- **`finally` block:** Always runs regardless of whether the request succeeded or failed (e.g., re-enabling the search button so the user can try again).
