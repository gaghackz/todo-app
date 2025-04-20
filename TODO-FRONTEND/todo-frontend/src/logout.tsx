import { useContext } from "react";
import { loggedin } from "./context";

const LogoutButton: React.FC = () => {
  const { setLogged } = useContext(loggedin) as {
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  };
  const handleLogout = () => {
    localStorage.removeItem("access");
    setLogged(false);
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px",
        backgroundColor: "#D8D8D8",
        color: "black",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
