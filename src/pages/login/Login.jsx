// hooks
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// styles
import classes from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();
  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={classes["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input onChange={(e) => setEmail(e.target.value)} type="email" />
      </label>
      <label>
        <span>Password:</span>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
      </label>

      {!isPending && <button className="btn">Submit</button>}
      {isPending && (
        <button disabled className="btn">
          Loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
