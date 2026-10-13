import {
  capitalize,
  slugify,
  truncate,
  chunk,
  unique,
  groupBy,
  once,
  memoize,
  debounce
} from "./index.js";

console.log(capitalize("hello world"));
console.log(slugify("Hello World!"));
console.log(truncate("JavaScript fundamentals", 10));

console.log(chunk([1, 2, 3, 4, 5], 2));
console.log(unique([1, 2, 2, 3, 4, 4, 5]));
console.log(
  groupBy(
    [
      { name: "Ali", role: "admin" },
      { name: "Sara", role: "user" },
      { name: "Bilal", role: "admin" }
    ],
    "role"
  )
);

const greetOnce = once((name) => "Welcome " + name);
console.log(greetOnce("Ali"));
console.log(greetOnce("Sara"));

const square = memoize((n) => n * n);
console.log(square(4));
console.log(square(4));

const showMessage = debounce((msg) => console.log(msg), 50);
showMessage("First call");
showMessage("Second call");
showMessage("Final debounce call");
