// react router dom
import { Link } from "react-router-dom";

// custom hooks
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// classes
import classes from "./NavBar.module.css";
function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={classes.navbar}>
      <ul>
        <li className={classes.title}>Finances</li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>Hello {user.displayName}</li>
            <li>
              <button onClick={logout} className={classes["btn_nav"]}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
