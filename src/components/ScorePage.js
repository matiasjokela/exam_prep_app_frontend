import LandingPage from "./LandingPage";
//import Button from './Button'
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ScorePage = ({ correct, total }) => {
  const [ok, setOk] = useState(0);

  if (ok === 1) {
    return <LandingPage />;
  }

  return (
    <div className="card_view">
      <h2>Hello World!</h2>
      <div>
        Sait {correct} / {total} oikein
      </div>
      <Button className="btn-lg" variant="dark" onClick={() => setOk(1)}>
        Ok
      </Button>
    </div>
  );
};

export default ScorePage;
