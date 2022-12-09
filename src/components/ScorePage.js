import { useState } from "react";
import { useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import userService from "../services/user";
import { useSelector, useDispatch } from "react-redux";
import { updateStats } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const ScorePage = ({ correct, total, category, user }) => {
  const [text, setText] = useState("Taidat tarvita vielä reilusti treeniä");

  const dispatch = useDispatch();
  const [updatedUser, setUpdatedUser] = useState(null);
  const navigate = useNavigate();
  let tmpUser;

  console.log("score", correct, total, category, user);

  useEffect(() => {
    if (correct / total === 1) {
      setText("Täydellinen suoritus, hienoa!");
    } else if (correct / total >= 0.8) {
      if (category === "fysiikka") {
        setText(`Taidat olla aikamoinen fysiikan maisteri!`);
      } else {
        setText(`Taidat olla aikamoinen ${category}n maisteri!`);
      }
    } else if (correct / total >= 0.6) {
      setText("Kohtuullinen tulos, mutta pystyt parempaankin!");
    } else if (correct / total >= 0.4) {
      setText("Tuloksessa on parantamisen varaa, jatka treenejä!");
    }
    if (category === "fysiikka" && user) {
      if (
        !user.bestTotal ||
        correct / total >= user.bestCorrect / user.bestTotal
      ) {
        tmpUser = {
          ...user,
          physicsCorrect: user.physicsCorrect + correct,
          physicsTotal: user.physicsTotal + total,
          bestCorrect: correct,
          bestTotal: total,
          bestCategory: "fysiikka",
        };
      } else {
        tmpUser = {
          ...user,
          physicsCorrect: user.physicsCorrect + correct,
          physicsTotal: user.physicsTotal + total,
        };
      }
      userService.update(tmpUser, user.id);
      setUpdatedUser(tmpUser);
      dispatch(updateStats(tmpUser));
    } else if (category === "kemia" && user) {
      if (
        !user.bestTotal ||
        correct / total >= user.bestCorrect / user.bestTotal
      ) {
        tmpUser = {
          ...user,
          chemistryCorrect: user.chemistryCorrect + correct,
          chemistryTotal: user.chemistryTotal + total,
          bestCorrect: correct,
          bestTotal: total,
          bestCategory: "kemia",
        };
      } else {
        tmpUser = {
          ...user,
          chemistryCorrect: user.chemistryCorrect + correct,
          chemistryTotal: user.chemistryTotal + total,
        };
      }
      userService.update(tmpUser, user.id);
      setUpdatedUser(tmpUser);
      dispatch(updateStats(tmpUser));
    } else if (category === "biologia" && user) {
      if (
        !user.bestTotal ||
        correct / total >= user.bestCorrect / user.bestTotal
      ) {
        tmpUser = {
          ...user,
          biologyCorrect: user.biologyCorrect + correct,
          biologyTotal: user.biologyTotal + total,
          bestCorrect: correct,
          bestTotal: total,
          bestCategory: "biologia",
        };
      } else {
        tmpUser = {
          ...user,
          biologyCorrect: user.biologyCorrect + correct,
          biologyTotal: user.biologyTotal + total,
        };
      }
      userService.update(tmpUser, user.id);
      setUpdatedUser(tmpUser);
      dispatch(updateStats(tmpUser));
    }
  }, [category, correct, total]);

  return (
    <Container style={{ width: "22rem" }}>
      <Card className="mb-3 mx-auto w-100 shadow card_view align-items-center">
        <Card.Header className="fs-4 mt-3 game_view">
          <strong>
            {" "}
            Sait {correct} / {total} oikein
          </strong>
        </Card.Header>
        <Card.Body>
          <Card.Text
            className="d-flex mb-4 mx-auto card_view align-items-center"
            style={{ height: "12rem" }}
          >
            {text}
          </Card.Text>
          <Button
            className="mb-3 mx-auto w-100"
            variant="outline-dark"
            onClick={() =>
              navigate("/", {
                state: {
                  user: updatedUser,
                },
              })
            }
          >
            OK
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScorePage;
