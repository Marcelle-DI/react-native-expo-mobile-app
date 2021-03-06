import React, { useContext, useState } from "react";
//import { TodosContext } from "./context";
import { SwipeListView } from "react-native-swipe-list-view";
import { Header, Item, Input } from "native-base";
import { StyleSheet, TouchableOpacity, View, Text, Button } from "react-native";
import uuid from "uuid-random";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function ToDoList(props) {
  // receive state and dispatch from App.js
  const { state, dispatch } = useContext(props.TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? "Edit" : "Add";

  const handleSubmit = () => {
    if (editMode) {
      dispatch({ type: "edit", payload: { ...editTodo, text: todoText } });
      setEditMode(false);
      setEditTodo(null);
    } else {
      const newToDo = { id: uuid(), text: todoText };
      dispatch({ type: "add", payload: newToDo });
    }
    setTodoText(""); // to clear field after adding
  };

  const renderItem = (data) => (
    <View style={styles.rowFront}>
      <Text>{data.item.text}</Text>
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backLeftBtn]}
        onPress={() => editRow(data.item, rowMap)}
      >
        <FontAwesome name="edit" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightLeftBtn]}
        onPress={() => moveupRow(data.item)}
      >
        <AntDesign name="upcircleo" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightLeftLeftBtn]}
        onPress={() => movedownRow(data.item)}
      >
        <AntDesign name="downcircle" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightRightBtn]}
        onPress={() => deleteRow(data.item)}
      >
        <MaterialIcons name="delete-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  const deleteRow = (todo) => {
    dispatch({ type: "delete", payload: todo });
  };

  const editRow = (todo, rowMap) => {
    setTodoText(todo.text);
    setEditMode(true);
    setEditTodo(todo);
    if (rowMap[todo.id]) {
      rowMap[todo.id].closeRow();
    }
  };

  const moveupRow = (todo) => {
    dispatch({ type: "moveup", payload: todo });
  };

  const movedownRow = (todo) => {
    dispatch({ type: "movedown", payload: todo });
  };

  return (
    <View>
      <Header searchBar>
        <Item>
          <Input
            placeholder="Enter Todo"
            onChangeText={(text) => setTodoText(text)}
            value={todoText}
            style={{ height: 26 }}
          />
        </Item>
        <Button
          transparent
          onPress={handleSubmit}
          title={buttonTitle}
          size="sm"
          colorScheme="tertiary"
        />
      </Header>
      <SwipeListView
        data={state.todos}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowFront: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomWidth: 0.25,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    backgroundColor: "orange",
    left: 0,
  },
  backRightRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 50,
    backgroundColor: "red",
    right: 0,
  },
  backRightLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 50,
    backgroundColor: "#666",
    right: 50,
  },
  backRightLeftLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 50,
    backgroundColor: "#666",
    right: 100,
  },
});
