import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { withProvider } from "./store/Store";

const Todos = () => {
  return (
    <Box p={2}>
      <Grid container direction="column">
        <Grid item>
          <TodoInput />
        </Grid>
        <Grid item>
          <TodoList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withProvider(Todos);
