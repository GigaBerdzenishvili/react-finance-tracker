// react hooks
import { useState } from "react";
// custom hooks
import { useSignup } from "../../hooks/useSignup";
// styles
import classes from "./Signup.module.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={classes["signup-form"]} onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        <span>Email:</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          required
        />
      </label>
      <label>
        <span>NickName:</span>
        <input
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          type="text"
          required
        />
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

export default Signup;
