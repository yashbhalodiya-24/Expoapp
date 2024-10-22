import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import useTodoStore from "../zusttodo/useTodoStore"; // Adjust the path as needed

const TodoComponent = () => {
  const [newTodo, setNewTodo] = useState(""); // Local state for new todo input
  const [editMode, setEditMode] = useState(null); // To manage editing mode
  const [editText, setEditText] = useState(""); // Local state for editing text

  // Get todos and actions from Zustand store
  const { todos, addTodo, removeTodo, toggleTodo, editTodo, loadTodos } =
    useTodoStore();

  // Load todos from AsyncStorage when the component mounts
  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleEditTodo = (id) => {
    editTodo(id, editText);
    setEditMode(null);
    setEditText("");
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={() => toggleTodo(item.id)}
        style={styles.todoTextContainer}
      >
        <Text style={item.completed ? styles.completed : styles.notCompleted}>
          {item.text}
        </Text>
      </TouchableOpacity>

      {editMode === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
            onPress={() => handleEditTodo(item.id)}
          >
            <Text style={{ color: "#fff" }}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setEditMode(item.id);
              setEditText(item.text);
            }}
          >
            <Text style={{ color: "#fff" }}>Edit</Text>
          </TouchableOpacity>
          <View style={{ margin: 3 }}></View>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
            onPress={() => removeTodo(item.id)}
          >
            <Text style={{ color: "#fff" }}>Delete</Text>
          </TouchableOpacity>
        
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder="Add a new to-do"
      />
      <TouchableOpacity
        onPress={handleAddTodo}
        style={{ backgroundColor: "#000", borderRadius: 10, padding: 10 }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}> Add To Do </Text>
      </TouchableOpacity>
      <View style={{ margin: 20 }}></View>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  todoTextContainer: {
    flex: 1,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  notCompleted: {
    color: "black",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 130,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TodoComponent;
