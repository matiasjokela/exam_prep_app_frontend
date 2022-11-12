import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import userService from "./services/user";
import { useEffect } from "react";
import { useState } from "react";

// Kysymykset
// Fysiikka 2020 syksy viimeisin lisätty
// Kemia 2020 kevät viimeisin lisätty
// Biologia 2020 syksy viimeisin lisätty

const App = () => {
  let valid = false;
  const [allUsers, setAllUsers] = useState([]);
  let local = null;
  try {
    local = JSON.parse(window.localStorage.getItem("loggedExamPrepUser"));
  } catch (e) {
    console.log(e);
  }

  useEffect(() => {
    userService.getAll().then((response) => setAllUsers(response));
  }, []);

  if (local) {
    allUsers.map((user) => {
      if (user.id === local.id) {
        console.log("jee", user);
        valid = true;
      }
    });
  }

  return (
    <div className="card_view">{!valid ? <LoginPage /> : <LandingPage />}</div>
  );
};

export default App;
