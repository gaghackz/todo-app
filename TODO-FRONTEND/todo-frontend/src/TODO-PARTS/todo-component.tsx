import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { loggedin } from "../context.tsx";
import { useNavigate } from "react-router-dom";

type Todo = {
  id: number;
  task: string;
  status: boolean;
  userid: number;
};

type LoggedInContextType = {
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTodos: () => Promise<void>;
};

export function Todos() {
  const { fetchTodos, todos, logged } = useContext(
    loggedin
  ) as LoggedInContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    } else {
      fetchTodos();
    }
  }, [logged]);

  const headers = {
    "Content-Type": "application/json",
    authorization: localStorage.getItem("access"),
  };
  const [task, setTask] = useState("");

  const toggleDone = async (id: number) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/todo/markdone",
        { id },
        { headers }
      );
      console.log(result.data.message);
      await fetchTodos();
    } catch (e) {
      console.error("Toggle status failed", e);
    }
  };

  const onAdd = async () => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/todo",
        { todo: task },
        { headers }
      );
      console.log(result);
      setTask("");
      await fetchTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async (id: number) => {
    try {
      const result = await axios.delete("http://localhost:3000/api/v1/todo", {
        headers: headers,
        data: { id },
      });
      console.log(result);
      await fetchTodos();
    } catch (e) {
      console.log(e);
    }
  };

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
      <div className="create_form">
        <input
          id="inpuText"
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button type="button" onClick={onAdd}>
          Add
        </button>
      </div>
      <div className="todo-list">
        {todos.length == 0 ? (
          <h2>Add something to show</h2>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="holder">
              <div className="todo-card">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleDone(todo.id)}
                />
                <span className="todo-text">{todo.task}</span>
              </div>
              <button
                className="delete-button"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
