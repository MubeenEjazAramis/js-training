// Task 15: typeof null, typeof [], and typeof function(){} explanations

// 1. typeof null returns "object"
// Why: In the original implementation of JavaScript (1995), values were represented by a type tag and a value.
// The type tag for an object was 0. The null pointer was 0x00 (all zeros), so JavaScript mistakenly read it as an object.
// This is a known historic bug kept for backward compatibility so older websites wouldn't break.

// 2. typeof [] returns "object"
// Why: In JavaScript, arrays are not a separate primitive data type.
// They are special objects with numbered indexes and built-in methods. To check if something is an array, we use Array.isArray().

// 3. typeof function(){} returns "function"
// Why: In JavaScript, functions are also objects (callable objects). However, typeof specifically returns "function"
// so that developers have a direct way to distinguish functions from regular objects and know they can be called.

console.log(typeof null);         // "object"
console.log(typeof []);           // "object"
console.log(typeof function(){}); // "function"
