import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import userService from "./services/user";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "./reducers/userReducer";
import { Link, Routes, Route, useMatch, Navigate } from "react-router-dom";
import StatsPage from "./components/StatsPage";
import GamePage from "./components/GamePage";
import ScorePage from "./components/ScorePage";

// Kysymykset
// Fysiikka 2020 syksy viimeisin lisätty
// Kemia 2020 kevät viimeisin lisätty
// Biologia 2020 syksy viimeisin lisätty

const App = () => {
  console.log("app");
  return (
    //kommentti
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
    //<div>{!user ? <LoginPage /> : <LandingPage />}</div>
  );
};

export default App;
