import { Home } from "./USER-PARTS/Login";
import "./components.css";
import { Todos } from "./TODO-PARTS/todo-component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { loggedin } from "./context";
import LogoutButton from "./logout";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [logged, setLogged] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const fetchTodos = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("access"),
    };
    try {
      const result = await axios.get("http://localhost:3000/api/v1/user", {
        headers,
      });
      setTodos(result.data.tasks);
      console.log(result);
    } catch (e) {
      console.error("Failed to fetch todos", e);
    }
  };
  return (
    <div>
      <BrowserRouter>
        <loggedin.Provider
          value={{
            logged,
            setLogged,
            todos,
            setTodos,
            refresh,
            setRefresh,
            fetchTodos,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            <LogoutButton />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/login" element={<Home />} />
          </Routes>
        </loggedin.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
