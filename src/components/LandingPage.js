import { useState, useEffect } from "react";
//import Button from "./Button";
//import ButtonList from "./ButtonList";
import GamePage from "./GamePage";
import questionService from "../services/questions";
import userService from "../services/user";
import LoginPage from "./LoginPage";
import StatsPage from "./StatsPage";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Dropdown,
  Card,
  Button,
} from "react-bootstrap";
import {
  Link,
  Routes,
  Route,
  useMatch,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { checkUser } from "../reducers/userReducer";
import {
  updateQuestions,
  updateLength,
  updateIndex,
} from "../reducers/gameReducer";

const LandingPage = () => {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("Landing");
  const [category, setCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    questionService.getAll().then((questions) => setQuestions(questions));
  }, []);

  //<Navigate replace={true} to="/login />"

  console.log("user", user);
  const handleSelect = (selected) => {
    if (selected === "fysiikka") {
      setCategory("fysiikka");
    } else if (selected === "biologia") {
      setCategory("biologia");
    } else if (selected === "kemia") {
      setCategory("kemia");
    }
  };
  // if (category === 'matematiikka') {
  // 	setCategoryStyles([selectedStyle, defaultStyle, defaultStyle])
  // } else if (category === 'englanti') {
  // 	setCategoryStyles([defaultStyle, selectedStyle, defaultStyle])
  // } else if (category === 'biologia') {
  // 	setCategoryStyles([defaultStyle, defaultStyle, selectedStyle])
  // }

  const toGameView = async () => {
    let filteredQuestions = questions.filter((question) =>
      question.category.includes(category)
    );
    let shuffledQuestions = filteredQuestions
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    console.log(shuffledQuestions);
    console.log("lol");
    dispatch(updateLength(questionCount));
    dispatch(updateQuestions(shuffledQuestions));
    navigate("/game");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedExamPrepUser");
    navigate("/login");
    window.location.reload(false);
  };

  const handleDelete = () => {
    if (window.confirm("Haluatko varmasti poistaa käyttäjätilisi?")) {
      window.localStorage.removeItem("loggedExamPrepUser");
      userService.deleteUser(user.id);
      navigate("/login");
      window.location.reload(false);
    }
  };
  //{user ? user.username : <Navigate replace={true} to="/login" />}
  return (
    <Container style={{ width: "22rem" }}>
      <Card className="card_view shadow">
        <Card.Title className="mt-3 ms-3 card_view">
          <Dropdown>
            <Dropdown.Toggle
              className="card_view"
              variant="outline-dark"
              size="sm"
            >
              {user ? user.username : <Navigate replace={true} to="/login" />}
              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={() => navigate("/stats")}>
                  Tilastot
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLogout()}>
                  Kirjaudu ulos
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDelete()}>
                  Poista tilini
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Toggle>
          </Dropdown>
        </Card.Title>

        <Card.Body>
          <Card.Title className="fs-5 mb-3">
            <strong>Kysymysten määrä</strong>
          </Card.Title>
          <ToggleButtonGroup
            className="mx-auto w-100"
            type="checkbox"
            value={questionCount}
          >
            <ToggleButton
              value={10}
              variant="outline-dark"
              onClick={() => setQuestionCount(10)}
            >
              10
            </ToggleButton>
            <ToggleButton
              value={15}
              variant="outline-dark"
              onClick={() => setQuestionCount(15)}
            >
              15
            </ToggleButton>
            <ToggleButton
              value={20}
              variant="outline-dark"
              onClick={() => setQuestionCount(20)}
            >
              20
            </ToggleButton>
          </ToggleButtonGroup>

          <hr />
          <Card.Title className="fs-5 mb-3">
            <strong>Kategoria</strong>
          </Card.Title>
          <ToggleButtonGroup
            className="mx-auto w-100"
            vertical
            type="checkbox"
            value={category}
          >
            <ToggleButton
              value={"fysiikka"}
              variant="outline-dark"
              onClick={() => handleSelect("fysiikka")}
            >
              Fysiikka
            </ToggleButton>
            <ToggleButton
              value={"biologia"}
              variant="outline-dark"
              onClick={() => handleSelect("biologia")}
            >
              Biologia
            </ToggleButton>
            <ToggleButton
              value={"kemia"}
              variant="outline-dark"
              onClick={() => handleSelect("kemia")}
            >
              Kemia
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            className="d-grid gap-2 mx-auto w-100"
            variant="dark"
            disabled={!questionCount || !category}
            onClick={() => toGameView()}
          >
            Pelaa
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LandingPage;

/*            <DropdownButton
              className="card_view"
              title={user.user.username}
              variant="outline-dark"
              menuVariant="dark"
              size="sm"
            >
              <Dropdown.Item onClick={() => handleLogout()}>
                Kirjaudu ulos
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDelete()}>
                Poista tilini
              </Dropdown.Item>
            </DropdownButton>*/
