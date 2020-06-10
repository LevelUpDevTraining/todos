import React, { useContext, createContext } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";

const Context = createContext({
  todos: [],
});

const Provider = (props) => {
  const { children } = props;
  const [todos, setTodos] = useLocalStorage("todos", [
    {
      id: 0,
      text: "feed the dog",
      completed: false,
    },
    {
      id: 1,
      text: "go shopping",
      completed: false,
    },
    {
      id: 2,
      text: "hang glide",
      completed: false,
    },
  ]);
  const addTodo = (text) => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 0;
    const newTodo = {
      id: nextId,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };
  const removeTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };
  const toggleTodo = (id) => {
    const foundTodo = todos.find((t) => t.id === id);
    if (foundTodo) {
      foundTodo.completed = !foundTodo.completed;
    }
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return foundTodo;
      }
      return t;
    });
    setTodos(newTodos);
  };
  return (
    <Context.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>
      {children}
    </Context.Provider>
  );
};

export const useTodos = () => useContext(Context);

export const withProvider = (Component) => {
  return (props) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
};
