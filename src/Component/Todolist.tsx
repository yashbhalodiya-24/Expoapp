// src/components/TodoList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { addTodo, toggleTodo, deleteTodo } from '../redux/todoSlice';

const TodoList = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim().length > 0) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        placeholder="Add new task"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <TouchableOpacity onPress={() => handleToggleTodo(item.id)}>
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;