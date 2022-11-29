import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import userService from "./services/user";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "./reducers/userReducer";

// Kysymykset
// Fysiikka 2020 syksy viimeisin lisätty
// Kemia 2020 kevät viimeisin lisätty
// Biologia 2020 syksy viimeisin lisätty

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let local = null;
  try {
    local = JSON.parse(window.localStorage.getItem("loggedExamPrepUser"));
  } catch (e) {
    console.log(e);
  }

  useEffect(() => {
    if (local && local.token) {
      const token = local.token;
      dispatch(checkUser({ token }));
    }
  }, []);

  return <div>{!user ? <LoginPage /> : <LandingPage />}</div>;
};

export default App;
