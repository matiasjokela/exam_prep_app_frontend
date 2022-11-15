import { useState, useEffect } from "react";
//import Button from "./Button";
//import ButtonList from "./ButtonList";
import GamePage from "./GamePage";
import questionService from "../services/questions";
import LoginPage from "./LoginPage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const LandingPage = () => {
  const defaultStyle = "button half_size_btn_normal";
  const selectedStyle = "button half_size_btn_selected";
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("Landing");
  const [category, setCategory] = useState(null);
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
    return <GamePage questions={shuffledQuestions} length={20} />;
  } else if (view === "Login") {
    return <LoginPage />;
  }

  const handleLogout = () => {
    console.log("click");
    window.localStorage.removeItem("loggedExamPrepUser");
    setView("Login");
  };

  return (
    <Card className="mx-auto" style={{ width: "18rem" }}>
      <Button
        className="btn-lg"
        variant="warning"
        onClick={() => handleSelect("fysiikka")}
      >
        Fysiikka
      </Button>
      <Button
        className="btn-lg"
        variant="warning"
        onClick={() => handleSelect("biologia")}
      >
        Biologia
      </Button>
      <Button
        className="btn-lg"
        variant="warning"
        onClick={() => handleSelect("kemia")}
      >
        Kemia
      </Button>
      <Button
        className="btn-lg"
        variant="success"
        onClick={() => setView("Game")}
      >
        Pelaa
      </Button>
    </Card>
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
