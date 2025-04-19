import { useEffect, useContext } from "react";
import { Create } from "./create.tsx";
import { loggedin } from "../context.tsx";
import { useNavigate } from "react-router-dom";

type Todo = {
  id: number;
  task: string;
};

export function Todos() {
  const { fetchTodos } = useContext(loggedin) as {
    fetchTodos: () => Promise<void>;
  };
  const { todos } = useContext(loggedin) as {
    todos: Todo[];
  };
  const { logged } = useContext(loggedin) as {
    logged: boolean;
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
    fetchTodos();
  }, []);

  return (
    <div className="home">
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
          fontSize: 40,
        }}
      >
        TODO-LIST
      </h1>
      <Create />
      {todos.length == 0 ? (
        <h2>Add something to show</h2>
      ) : (
        todos.map((todo) => <div key={todo.id}>{todo.task}</div>)
      )}
    </div>
  );
}
