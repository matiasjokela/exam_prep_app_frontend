import { useState, useEffect } from "react";
//import Button from "./Button";
//import ButtonList from "./ButtonList";
import GamePage from "./GamePage";
import questionService from "../services/questions";
import LoginPage from "./LoginPage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ButtonGroup, Container, ListGroup, Row, Table } from "react-bootstrap";
import LandingPage from "./LandingPage";
import userService from "../services/user";

const StatsPage = () => {
  const [view, setView] = useState("Stats");
  const [user, setUser] = useState(null);
  const [physics, setPhysics] = useState("Ei pelejä");
  const [chemistry, setChemistry] = useState("Ei pelejä");
  const [biology, setBiology] = useState("Ei pelejä");
  const [best, setBest] = useState("Ei pelejä");

  const localUser = JSON.parse(
    window.localStorage.getItem("loggedExamPrepUser")
  ); // Tee tämä staten avulla mieluummin??

  useEffect(() => {
    userService.getById(localUser.id).then((response) => {
      setUser(response);
    });
  }, []);

  if (user && best === "Ei pelejä") {
    if (user.physicsTotal) {
      setPhysics(`${user.physicsCorrect} / ${user.physicsTotal} (
			${Math.round((user.physicsCorrect / user.physicsTotal) * 100)} %)`);
    }
    if (user.chemistryTotal) {
      setChemistry(`${user.chemistryCorrect} / ${user.chemistryTotal} (
			  ${Math.round((user.chemistryCorrect / user.chemistryTotal) * 100)} %)`);
    }
    if (user.biologyTotal) {
      setBiology(`${user.biologyCorrect} / ${user.biologyTotal} (
			  ${Math.round((user.biologyCorrect / user.biologyTotal) * 100)} %)`);
    }
    if (user.bestTotal) {
      setBest(`${user.bestCorrect} / ${user.bestTotal} (
			${Math.round((user.bestCorrect / user.bestTotal) * 100)} %, 
			${user.bestCategory})`);
    }
  }

  const handleZero = () => {
    if (user && window.confirm("Haluatko varmasti poistaa kaikki tilastot")) {
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
      setPhysics("Ei pelejä");
      setChemistry("Ei pelejä");
      setBiology("Ei pelejä");
      setBest("Ei pelejä");
      setUser(null);
    }
  };

  if (view === "Landing") {
    return <LandingPage />;
  }

  return (
    <Container className="mt-3 mb-5 col-lg-3 card_view">
      <Card className="shadow card_view">
        <Card.Header className="fs-4 d-flex mb-4 mx-auto card_view align-items-center">
          <strong>Tilastot</strong>
        </Card.Header>
        <Card.Header>
          <Container className="p-2">
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => setView("Landing")}
            >
              Takaisin
            </Button>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => handleZero()}
            >
              Nollaa tilastot
            </Button>
          </Container>
        </Card.Header>
        <Card.Body>
          <Container className="d-flex flex-wrap">
            <span>
              <b>Fysiikka</b>
            </span>
            <span className="ms-auto my-sm-0 mt-2 text-muted">{physics}</span>
          </Container>
          <hr />
          <Container className="d-flex flex-wrap">
            <span>
              <b>Kemia</b>
            </span>
            <span className="ms-auto my-sm-0 mt-2 text-muted">{chemistry}</span>
          </Container>
          <hr />
          <Container className="d-flex flex-wrap">
            <span>
              <b>Biologia</b>
            </span>
            <span className="ms-auto my-sm-0 mt-2 text-muted">{biology}</span>
          </Container>
          <hr />
          <Container className="d-flex flex-wrap">
            <span>
              <b>Paras</b>
            </span>
            <span className="ms-auto my-sm-0 mt-2 text-muted">{best}</span>
          </Container>
          <hr />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StatsPage;

/*
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
*/
