import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// custom hooks
import { useAuthContext } from "./hooks/useAuthContext";

// components
import NavBar from "./components/NavBar";

// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

// styles
import "./App.css";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            ></Route>
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            ></Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
