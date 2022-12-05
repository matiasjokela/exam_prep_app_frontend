import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import userService from "../services/user";
import { useSelector, useDispatch } from "react-redux";
import { updateStats } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const StatsPage = () => {
  const [physics, setPhysics] = useState("Ei pelejä");
  const [chemistry, setChemistry] = useState("Ei pelejä");
  const [biology, setBiology] = useState("Ei pelejä");
  const [best, setBest] = useState("Ei pelejä");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [updatedUser, setUpdatedUser] = useState(user);
  const navigate = useNavigate();

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
      userService.update(tmpUser, user.id);
      dispatch(updateStats(tmpUser));
      setUpdatedUser(tmpUser);
      setPhysics("Ei pelejä");
      setChemistry("Ei pelejä");
      setBiology("Ei pelejä");
      setBest("Ei pelejä");
    }
  };
  //

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
