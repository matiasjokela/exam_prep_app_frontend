import { useState, useEffect } from "react";
//import Button from "./Button";
//import ButtonList from "./ButtonList";
import GamePage from "./GamePage";
import questionService from "../services/questions";
import LoginPage from "./LoginPage";
import StatsPage from "./StatsPage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
  ButtonGroup,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

// Täytyy lisätä error handling, jos ei valintaa tai pakottaa valinta

const LandingPage = () => {
  const defaultStyle = "button half_size_btn_normal";
  const selectedStyle = "button half_size_btn_selected";
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("Landing");
  const [category, setCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [categoryStyles, setCategoryStyles] = useState([
    defaultStyle,
    defaultStyle,
    defaultStyle,
  ]);

  useEffect(() => {
    questionService.getAll().then((questions) => setQuestions(questions));
  }, []);

  const handleSelect = (selected) => {
    if (selected === "fysiikka") {
      setCategory("fysiikka");
      setCategoryStyles([selectedStyle, defaultStyle, defaultStyle]);
    } else if (selected === "biologia") {
      setCategory("biologia");
      setCategoryStyles([defaultStyle, selectedStyle, defaultStyle]);
    } else if (selected === "kemia") {
      setCategory("kemia");
      setCategoryStyles([defaultStyle, defaultStyle, selectedStyle]);
    }
  };
  // if (category === 'matematiikka') {
  // 	setCategoryStyles([selectedStyle, defaultStyle, defaultStyle])
  // } else if (category === 'englanti') {
  // 	setCategoryStyles([defaultStyle, selectedStyle, defaultStyle])
  // } else if (category === 'biologia') {
  // 	setCategoryStyles([defaultStyle, defaultStyle, selectedStyle])
  // }

  if (view === "Game") {
    let filteredQuestions = questions.filter((question) =>
      question.category.includes(category)
    );
    let shuffledQuestions = filteredQuestions
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    console.log(shuffledQuestions);
    return <GamePage questions={shuffledQuestions} length={questionCount} />;
  } else if (view === "Login") {
    return <LoginPage />;
  } else if (view === "Stats") {
    return <StatsPage />;
  }

  console.log("count", questionCount);

  const handleLogout = () => {
    console.log("click");
    if (window.confirm("Haluatko varmasti kirjautua ulos?")) {
      window.localStorage.removeItem("loggedExamPrepUser");
      setView("Login");
    }
  };

  const handleQuestionChange = (value) => {
    setQuestionCount(value);
    console.log("click", value);
  };

  return (
    <Container className="mt-3 mb-5 col-lg-3 card_view">
      <Card className="fs-4 d-flex mb-4 mx-auto card_view align-items-center">
        <Card.Header className="card_view">
          <Container className="p-2">
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => setView("Stats")}
            >
              Tilastot
            </Button>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => handleLogout()}
            >
              Kirjaudu ulos
            </Button>
          </Container>
        </Card.Header>
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
              className="d-grid gap-2 mx-auto w-100"
              value={5}
              variant="outline-dark"
              onClick={() => setQuestionCount(5)}
            >
              5
            </ToggleButton>
            <ToggleButton
              className="d-grid gap-2 mx-auto w-100"
              value={10}
              variant="outline-dark"
              onClick={() => setQuestionCount(10)}
            >
              10
            </ToggleButton>
            <ToggleButton
              className="d-grid gap-2 mx-auto w-100"
              value={15}
              variant="outline-dark"
              onClick={() => setQuestionCount(15)}
            >
              15
            </ToggleButton>
            <ToggleButton
              className="d-grid gap-2 mx-auto w-100"
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
            onClick={() => setView("Game")}
          >
            Pelaa
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LandingPage;

// OMA CSS

/*<div className="card_view">
<Button
  text="kirjaudu ulos"
  style="button button_logout"
  handleClick={handleLogout}
/>
<div className="content_box">
  <h2>Valitse aihe</h2>
</div>
<div>
  <Button
	style={categoryStyles[0]}
	text="Fysiikka"
	handleClick={() => handleSelect("fysiikka")}
  />
  <Button
	style={categoryStyles[1]}
	text="Biologia"
	handleClick={() => handleSelect("biologia")}
  />
</div>
<div>
  <Button
	style={categoryStyles[2]}
	text="Kemia"
	handleClick={() => handleSelect("kemia")}
  />
</div>
{!category ? (
  <div>valitse aihe</div>
) : (
  <Button
	text="Pelaa"
	style="button button_normal"
	handleClick={() => setView("Game")}
  />
)}
</div>*/
