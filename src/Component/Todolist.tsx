import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  VirtualizedList,
  SafeAreaView,
} from "react-native";
import { addTodo, toggleTodo, deleteTodo } from "../redux/todoSlice";

const TodoList = () => {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim().length > 0) {
      dispatch(addTodo(text));
      setText("");
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
        style={{
          marginBottom: 10,
          padding: 10,
          borderRadius: 25,
          elevation: 5,
          backgroundColor: "#d9d7d7",
        }}
        placeholder="Add new task"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity
        onPress={handleAddTodo}
        style={{
          backgroundColor: "#000",
          padding: 9,
          borderRadius: 13,
          alignItems: "center",
          elevation: 5,
        }}
      >
        <Text style={{ color: "#fff" }}>Add Todo</Text>
      </TouchableOpacity>
      <SafeAreaView>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
              backgroundColor: "#d9d7d7",
              borderRadius: 25,
              padding: 5,
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => handleToggleTodo(item.id)}>
              <Text
                style={{ 
                  textDecorationLine: item.completed ? "line-through" : "none",
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteTodo(item.id)}
              style={{
                backgroundColor: "#FF6347",
                padding: 20,
                borderRadius: 45,
                marginRight: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      </SafeAreaView>
    </View>
  );
};

export default TodoList;
