import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import StatsPage from "./components/StatsPage";
import GamePage from "./components/GamePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
  );
};

export default App;
