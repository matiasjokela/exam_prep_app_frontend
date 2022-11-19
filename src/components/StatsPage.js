import { useState, useEffect } from "react";
//import Button from "./Button";
//import ButtonList from "./ButtonList";
import GamePage from "./GamePage";
import questionService from "../services/questions";
import LoginPage from "./LoginPage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ButtonGroup, Container, Row } from "react-bootstrap";
import LandingPage from "./LandingPage";
import userService from "../services/user";

/* HUOM Joku bugi jäi, katso konsoli! */

const StatsPage = () => {
  const [view, setView] = useState("Stats");
  const [user, setUser] = useState(null);
  const localUser = JSON.parse(
    window.localStorage.getItem("loggedExamPrepUser")
  ); // Tee tämä staten avulla mieluummin??

  useEffect(() => {
    userService.getById(localUser.id).then((response) => setUser(response));
  }, []);

  // Miten saatiinkaan sivu refreshaamaan fiksusti
  const handleZero = () => {
    if (user) {
      userService.update(
        {
          physicsCorrect: 0,
          physicsTotal: 0,
          chemistryCorrect: 0,
          chemistryTotal: 0,
          biologyCorrect: 0,
          biologyTotal: 0,
          bestCorrect: 0,
          bestTotal: 0,
          bestCategory: "",
        },
        user.id
      );
    }
  };

  if (view === "Landing") {
    return <LandingPage />;
  }

  // Tilastoille joku siistimpi esitytapa, taulukko tms.
  if (user) {
    return (
      <Container className="p-sm-3 p-0 align-items-center card_view">
        <Card className="mb-3 mx-auto w-100 shadow card_view align-items-center">
          <Card.Body>
            <ButtonGroup>
              <Button
                className="d-grid gap-2 mx-auto w-100"
                variant="outline-dark"
                onClick={() => setView("Landing")}
              >
                Takaisin
              </Button>
              <Button
                className="d-grid gap-2 mx-auto w-100"
                variant="outline-dark"
                onClick={() => handleZero()}
              >
                Nollaa tilastot
              </Button>
            </ButtonGroup>

            <Card.Title
              className="fs-5 d-flex mb-4 mx-auto card_view align-items-center"
              style={{ height: "3rem" }}
            >
              Tilastot
            </Card.Title>
            <Card.Text>
              <Row>
                Fysiikka: {user.physicsCorrect} / {user.physicsTotal} (
                {(user.physicsCorrect / user.physicsTotal) * 100} %)
              </Row>
              <Row>
                Kemia: {user.chemistryCorrect} / {user.chemistryTotal} (
                {(user.chemistryCorrect / user.chemistryTotal) * 100} %)
              </Row>
              <Row>
                Biologia: {user.biologyCorrect} / {user.biologyTotal} (
                {(user.biologyCorrect / user.biologyTotal) * 100} %)
              </Row>
              <Row>
                Paras: {user.bestCorrect} / {user.bestTotal} (
                {(user.bestCorrect / user.bestTotal) * 100} %,{" "}
                {user.bestCategory})
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

export default StatsPage;
