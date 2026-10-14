# Day 4: The DOM, Events, and Forms (Notes)

## Stand-up Questions & Answers

### 1. What is event bubbling, and where did you use it?
- **What is Event Bubbling?**
  - When an event (like a click or change) happens on an element inside HTML, it doesn't just stay on that element. It travels ("bubbles") upwards to its parent element, grandparent, and all the way to `document`.
- **Where did we use it (Event Delegation)?**
  - We used event bubbling on the `<ul id="todo-list">` container. Instead of attaching separate event listeners to every task or button, we attached one listener to the parent list:
    1. **Delete Button:** When the delete button is clicked, the click event bubbles up to the `<ul>`. We check if `e.target.classList.contains('delete-btn')`, find the parent task's ID from `li.dataset.id`, and delete it.
    2. **Checkbox:** When a checkbox is checked/unchecked, the `change` event bubbles up to `<ul>`. We check if `e.target.classList.contains('todo-checkbox')` and toggle that task's completed state.
    3. **Double-Click Edit:** When a task text is double-clicked, the `dblclick` event bubbles up, and we switch that task to edit mode.
  - **Why this is better:** We don't have to add or remove event listeners every time a task is added or removed.

---

### 2. Why does a form reload the page, and how did you stop it?
- **Why does a form reload the page?**
  - By default in HTML, submitting a `<form>` triggers an HTTP request to send form data to a server, which causes the browser to reload the page.
- **How did we stop it?**
  - In JavaScript, inside the form's `'submit'` event listener, we call `e.preventDefault()`:
    ```javascript
    todoForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Stops the browser from refreshing the page
      addTask(todoInput.value);
      todoInput.value = '';
    });
    ```
  - This stops the default page reload, allowing JavaScript to update the list smoothly without refreshing.

---

### 3. What was annoying about updating the DOM by hand?
1. **Manual synchronization:** Whenever data in the `todos` array changes, we have to manually remember to call `render()` to update the HTML on the screen.
2. **Recreating HTML:** Clearing the list and creating elements (`document.createElement`, setting classes, setting innerHTML) takes repetitive code.
3. **Handling focus and editing:** When switching an item to edit mode, we have to manually find the input and call `.focus()` and `.select()`.
- *Key Takeaway:* This explains why React and modern UI libraries are so popular—they automatically update the DOM whenever data/state changes!
