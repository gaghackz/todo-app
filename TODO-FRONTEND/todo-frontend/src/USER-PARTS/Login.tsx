import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loggedin } from "../context";

export function Home() {
  const [meow, setMeow] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLogged } = useContext(loggedin) as {
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      setLogged(true);
      navigate("/todos");
    }
  }, [setLogged, navigate]);

  async function Login() {
    const result = await axios.post("http://localhost:3000/api/v1/user/login", {
      username,
      password,
    });
    if (result.data.success) {
      localStorage.setItem("access", result.data.data);
      console.log(result);
      navigate("/todos");
    } else {
      setMeow(false);
    }
  }

  async function Register() {
    const result = await axios.post(
      "http://localhost:3000/api/v1/user/register",
      { username: username, password: password }
    );
    if (result.data.success) {
      localStorage.setItem("access", result.data.data);
      console.log(result);
      navigate("/todos");
    }
  }

  return (
    <div className="login">
      <h1 style={{ color: "white" }}>TODO-LOGIN</h1>
      <input
        type="text"
        placeholder="Username.."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password.."
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-button">
        <button onClick={Login}>Login</button>
        <button onClick={Register}>Register</button>
      </div>
      {meow ? <div></div> : <div>Invalid credentials!</div>}
    </div>
  );
}
