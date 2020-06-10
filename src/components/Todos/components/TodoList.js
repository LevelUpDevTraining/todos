import React, { useState, useMemo } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import { useTodos } from "../store/Store";

const TodoList = () => {
  const [filter, setFilter] = useState("all");
  const { todos, toggleTodo, removeTodo } = useTodos();
  const filteredTodos = useMemo(() => {
    if (filter === "all") {
      return todos;
    } else if (filter === "completed") {
      return todos.filter((t) => t.completed);
    } else if (filter === "not_completed") {
      return todos.filter((t) => !t.completed);
    }
  }, [todos, filter]);
  return (
    <>
      <List>
        {filteredTodos.map((todo) => {
          return (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.text} />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={todo.completed}
                  onClick={() => toggleTodo(todo.id)}
                />
                <IconButton onClick={() => removeTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Box pr={1} component="span">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
      </Box>
      <Box pr={1} component="span">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </Box>
      <Box component="span">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setFilter("not_completed")}
        >
          Due
        </Button>
      </Box>
    </>
  );
};

export default TodoList;
