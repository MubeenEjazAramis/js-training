# Closures in JavaScript

A closure is created when an inner function remembers and accesses variables from its outer function's scope, even after the outer function has finished executing.

## Example from Code

```javascript
export function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
```

## How It Works

1. The outer function `once` declares `called` and `result`.
2. The returned inner function accesses both `called` and `result`.
3. Even after `once` finishes executing, the inner function preserves access to `called` and `result` in memory.
