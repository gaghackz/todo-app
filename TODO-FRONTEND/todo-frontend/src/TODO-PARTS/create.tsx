import { useContext, useState } from "react";
import axios from "axios";
import { loggedin } from "../context";

export function Create() {
  const { fetchTodos } = useContext(loggedin) as {
    fetchTodos: () => Promise<void>;
  };
  const headers = {
    "Content-Type": "application/json",
    authorization: localStorage.getItem("access"),
  };
  const [task, setTask] = useState("");

  const onAdd = async () => {
    try {
      const result = await axios.post(
        "https://todo-app-rd10.onrender.com/api/v1/todo",
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

  return (
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
  );
}
