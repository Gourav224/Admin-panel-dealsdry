import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./pages/Login.jsx";
import Header from "./components/header/Header.jsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import api from "./config/apiCall.js";
import { login, logout } from "./store/authSlice.js";

function App() {
  const authStatus = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();

  useEffect(() => {
    api.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData.data.data.user));
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return authStatus ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Login />
  );
}

export default App;
