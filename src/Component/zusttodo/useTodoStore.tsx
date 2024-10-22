import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to save todos to AsyncStorage
const saveTodosToStorage = async (todos) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (e) {
    console.error("Error saving todos to AsyncStorage", e);
  }
};

// Zustand store to manage to-dos
const useTodoStore = create((set, get) => ({
  todos: [],  // Initial state

  // Load todos from AsyncStorage when the app starts
  loadTodos: async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        set({ todos: JSON.parse(storedTodos) });
      }
    } catch (e) {
      console.error("Error loading todos from AsyncStorage", e);
    }
  },

  // Add a new to-do
  addTodo: (todo) => {
    set((state) => {
      const newTodos = [...state.todos, { id: Date.now(), text: todo, completed: false }];
      saveTodosToStorage(newTodos);
      return { todos: newTodos };
    });
  },

  // Remove a to-do
  removeTodo: (id) => {
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      saveTodosToStorage(newTodos);
      return { todos: newTodos };
    });
  },

  // Edit a to-do
  editTodo: (id, newText) => {
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      saveTodosToStorage(newTodos);
      return { todos: newTodos };
    });
  },

  // Toggle a to-do's completion status
  toggleTodo: (id) => {
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodosToStorage(newTodos);
      return { todos: newTodos };
    });
  },
}));

export default useTodoStore;
