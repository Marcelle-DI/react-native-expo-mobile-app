import React, { useReducer } from "react";
import { TodosContext } from "./context";
import ToDoList from "./components/ToDoList";

const todosInitialState = {
  todos: [
    { id: "1", text: "add date feature" },
    { id: "2", text: "add move row up and down feature" },
    { id: "3", text: "add local storage feature" },
    { id: "4", text: "add Auth0 login feature" },
    { id: "5", text: "add notifications feature" },
    { id: "6", text: "add custom theme feature" },
  ],
};

export default function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList TodosContext={TodosContext} />
    </TodosContext.Provider>
  );
}

function todosReducer(state, action) {
  switch (action.type) {
    case "add":
      // add new todo onto array
      const addedToDos = [...state.todos, action.payload];
      // spread our state and assign todos
      return { ...state, todos: addedToDos };
    case "edit":
      const updatedToDo = { ...action.payload };
      const updatedToDoIndex = state.todos.findIndex(
        (t) => t.id === action.payload.id
      );
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1),
      ];
      return { ...state, todos: updatedToDos };
    case "delete":
      const filteredTodoState = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return { ...state, todos: filteredTodoState };
    default:
      return todosInitialState;
  }
}
