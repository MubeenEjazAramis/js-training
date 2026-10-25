// Reducer function for Monday's To-Do state
// A reducer is a pure function: (currentState, action) => newState
// It must NOT mutate state directly (no push, no splice)
export function todoReducer(state, action) {
  switch (action.type) {
    // Action 1: Add a new todo item
    case 'added': {
      if (!action.text || !action.text.trim()) {
        return state;
      }

      const newTodo = {
        id: Date.now(),
        text: action.text.trim(),
        completed: false,
        priority: action.priority || 'Medium',
      };

      // Return a new array with the new todo at the start
      return [newTodo, ...state];
    }

    // Action 2: Toggle completed status of an item
    case 'toggled': {
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    }

    // Action 3: Delete an item by ID
    case 'deleted': {
      return state.filter((todo) => todo.id !== action.id);
    }

    // Action 4: Clear all completed items or clear all items
    case 'cleared': {
      // Clear completed tasks (or clear all tasks)
      return state.filter((todo) => !todo.completed);
    }

    // Action 5: Clear everything completely
    case 'cleared_all': {
      return [];
    }

    // Default case: return unchanged state if action type is unknown
    default: {
      console.warn(`Unknown action type: ${action.type}`);
      return state;
    }
  }
}

export const initialTodos = [
  { id: 1, text: 'Review React Refs and DOM access', completed: true, priority: 'High' },
  { id: 2, text: 'Build custom hooks (useToggle, useLocalStorage)', completed: true, priority: 'Medium' },
  { id: 3, text: 'Refactor Recipe App v2 with Context', completed: false, priority: 'High' },
  { id: 4, text: 'Push branch w2-d4 and open Pull Request', completed: false, priority: 'Low' },
];
