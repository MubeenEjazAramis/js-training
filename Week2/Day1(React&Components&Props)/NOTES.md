# Week 2 Day 1: React Fundamentals (JSX, Components & Props)

## Core Concepts

### 1. JSX (JavaScript XML)
JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.
- JSX tags must be closed (e.g. `<input />`, `<img />`).
- JSX attributes use camelCase (e.g. `className` instead of `class`, `htmlFor` instead of `for`).
- Expressions inside curly braces `{}` are evaluated as JavaScript.

### 2. Components
Components are the building blocks of a React user interface. A component is a JavaScript function that returns JSX markup.
- Component names must start with a capital letter (e.g., `Header`, `ProductCard`) so React distinguishes them from standard HTML elements (e.g., `div`, `span`).

### 3. Props (Properties)
Props are inputs passed from a parent component to a child component, similar to arguments passed to a function.
- Props are read-only (immutable).
- Components must remain pure with respect to their props.
- Default props can be defined via JavaScript default parameter values: `function Greeting({ name = "Guest" })`.

### 4. Children Prop
The `children` prop represents whatever content is placed between the opening and closing tags of a component:
```jsx
<Card title="User Info">
  <p>Nested child content</p>
</Card>
```

### 5. Conditional Rendering
Rendering different markup based on conditions using:
- Ternary operator (`condition ? <ComponentA /> : <ComponentB />`)
- Logical AND (`condition && <Component />`)
- Standard JavaScript `if` statements before returning JSX.

### 6. Rendering Lists with Keys
Using `.map()` to render an array of items into a list of components:
- Every list item must have a unique `key` prop (such as an item's unique `id`).
- Keys allow React to identify which items have changed, been added, or been removed during re-renders.

---

## Interview Questions & Answers

### 1. Why must component names start with a capital letter?
In JSX, lowercase tags like `<div>` or `<span>` are treated as built-in HTML elements. React compiles lowercase names into strings (`React.createElement('div')`). Uppercase names like `<Header />` or `<ProductCard />` indicate custom React components (`React.createElement(Header)`).

### 2. What is `children` in React?
`children` is a special prop automatically provided by React. It contains whatever elements, strings, or components are placed between the opening and closing tags of a parent component.

### 3. Why does React need a key on list items?
React uses keys to keep track of individual list elements across renders. When data updates or items are reordered, keys enable React to perform minimal DOM updates efficiently rather than re-creating the entire list.

### 4. Why is array index a poor key?
Using array indices (0, 1, 2...) as keys causes bugs when items are inserted, deleted, or reordered. Because indices change based on position, React may incorrectly reuse component state or DOM nodes from the wrong items. Always use stable, unique identifiers (like `id`).
