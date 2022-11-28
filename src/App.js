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
  let valid = true;
  const dispatch = useDispatch();
  //   const [allUsers, setAllUsers] = useState([]);
  let local = null;
  try {
    local = JSON.parse(window.localStorage.getItem("loggedExamPrepUser"));
  } catch (e) {
    console.log(e);
  }
  console.log(local);

  useEffect(() => {
    dispatch(checkUser(local));
  }, []);

  //   if (local) {
  //     allUsers.map((user) => {
  //       if (user.id === local.id) {
  //         console.log("jee", user);
  //         valid = true;
  //       }
  //     });
  //   }

  return <div>{!valid ? <LoginPage /> : <LandingPage />}</div>;
};

export default App;
