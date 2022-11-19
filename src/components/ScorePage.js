import LandingPage from "./LandingPage";
//import Button from './Button'
import { useState } from "react";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import userService from "../services/user";

const ScorePage = ({ correct, total, category }) => {
  const [ok, setOk] = useState(0);
  const [user, setUser] = useState(null);
  let updatedFields;
  const localUser = JSON.parse(
    window.localStorage.getItem("loggedExamPrepUser")
  ); // Tee tämä staten avulla mieluummin??

  useEffect(() => {
    userService.getById(localUser.id).then((response) => setUser(response));
  }, []);

  console.log("user", user);
  if (category === "fysiikka" && user) {
    if (
      !user.bestTotal ||
      correct / total >= user.bestCorrect / user.bestTotal
    ) {
      updatedFields = {
        physicsCorrect: user.physicsCorrect + correct,
        physicsTotal: user.physicsTotal + total,
        bestCorrect: correct,
        bestTotal: total,
        bestCategory: "fysiikka",
      };
    } else {
      updatedFields = {
        physicsCorrect: user.physicsCorrect + correct,
        physicsTotal: user.physicsTotal + total,
      };
    }
    userService.update(updatedFields, user.id);
  } else if (category === "kemia" && user) {
    if (
      !user.bestTotal ||
      correct / total >= user.bestCorrect / user.bestTotal
    ) {
      updatedFields = {
        chemistryCorrect: user.chemistryCorrect + correct,
        chemistryTotal: user.chemistryTotal + total,
        bestCorrect: correct,
        bestTotal: total,
        bestCategory: "kemia",
      };
    } else {
      updatedFields = {
        chemistryCorrect: user.chemistryCorrect + correct,
        chemistryTotal: user.chemistryTotal + total,
      };
    }
    userService.update(updatedFields, user.id);
  } else if (category === "biologia" && user) {
    if (
      !user.bestTotal ||
      correct / total >= user.bestCorrect / user.bestTotal
    ) {
      updatedFields = {
        biologyCorrect: user.biologyCorrect + correct,
        biologyTotal: user.biologyTotal + total,
        bestCorrect: correct,
        bestTotal: total,
        bestCategory: "biologia",
      };
    } else {
      updatedFields = {
        biologyCorrect: user.biologyCorrect + correct,
        biologyTotal: user.biologyTotal + total,
      };
    }
    userService.update(updatedFields, user.id);
  }

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
