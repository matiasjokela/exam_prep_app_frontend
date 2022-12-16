import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import userService from "../services/user";
import { useNavigate, useLocation } from "react-router-dom";

const StatsPage = () => {
  const [physics, setPhysics] = useState("Ei pelejä");
  const [chemistry, setChemistry] = useState("Ei pelejä");
  const [biology, setBiology] = useState("Ei pelejä");
  const [best, setBest] = useState("Ei pelejä");
  const location = useLocation();
  let user = null;

  const navigate = useNavigate();

  try {
    user = location.state.user;
  } catch (e) {
    console.log(e);
  }

  const [updatedUser, setUpdatedUser] = useState(null);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  console.log("stats");

  useEffect(() => {
    if (user) {
      userService
        .getById(user.id)
        .then((returnedUser) => setUpdatedUser(returnedUser));
    }
  }, [user]);

  if (updatedUser && best === "Ei pelejä") {
    if (updatedUser.physicsTotal) {
      setPhysics(`${updatedUser.physicsCorrect} / ${updatedUser.physicsTotal} (
			${Math.round(
        (updatedUser.physicsCorrect / updatedUser.physicsTotal) * 100
      )} %)`);
    }
    if (updatedUser.chemistryTotal) {
      setChemistry(`${updatedUser.chemistryCorrect} / ${
        updatedUser.chemistryTotal
      } (
			  ${Math.round(
          (updatedUser.chemistryCorrect / updatedUser.chemistryTotal) * 100
        )} %)`);
    }
    if (updatedUser.biologyTotal) {
      setBiology(`${updatedUser.biologyCorrect} / ${updatedUser.biologyTotal} (
			  ${Math.round(
          (updatedUser.biologyCorrect / updatedUser.biologyTotal) * 100
        )} %)`);
    }
    if (updatedUser.bestTotal) {
      setBest(`${updatedUser.bestCorrect} / ${updatedUser.bestTotal} (
			${Math.round((updatedUser.bestCorrect / updatedUser.bestTotal) * 100)} %, 
			${updatedUser.bestCategory})`);
    }
  }

  const handleZero = () => {
    if (user && window.confirm("Haluatko varmasti poistaa kaikki tilastot")) {
      const tmpUser = {
        ...user,
        physicsCorrect: 0,
        physicsTotal: 0,
        chemistryCorrect: 0,
        chemistryTotal: 0,
        biologyCorrect: 0,
        biologyTotal: 0,
        bestCorrect: 0,
        bestTotal: 0,
        bestCategory: "",
      };
      userService
        .update(tmpUser, user.id)
        .then((returnedUser) => setUpdatedUser(returnedUser));
      window.location.reload(false);
    }
  };

  return (
    <Container className="mb-4" style={{ width: "22rem" }}>
      <Card className="shadow game_view">
        <Card.Header className="fs-4 d-flex mb-4 mx-auto game_view align-items-center">
          <strong>Tilastot</strong>
        </Card.Header>
        <Card.Header className="game_view">
          <Container className="p-2">
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() =>
                navigate("/", {
                  state: {
                    user: updatedUser,
                  },
                })
              }
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
