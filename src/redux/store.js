// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import apiReducer from './apiSlice';
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    api: apiReducer,

  },
});
