import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Card";
//import Button from "./Button";
//import Notification from "./Notification";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import ScorePage from "./ScorePage";
import {
  ButtonGroup,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuestions,
  updateLength,
  updateIndex,
} from "../reducers/gameReducer";
import { useLocation } from "react-router-dom";
import {
  Link,
  Routes,
  Route,
  useMatch,
  useNavigate,
  Navigate,
} from "react-router-dom";

const GamePage = () => {
  const defaultStyle = "outline-dark";
  const correctStyle = "success";
  const incorrectStyle = "danger";
  const [correct, setCorrect] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState("");
  const [styleA, setStyleA] = useState(defaultStyle);
  const [styleB, setStyleB] = useState(defaultStyle);
  const [styleC, setStyleC] = useState(defaultStyle);
  const [styleD, setStyleD] = useState(defaultStyle);
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, length, index } = location.state;

  console.log(questions, length, index);

  console.log("Peli", questions, length);

  let len;

  questions.length < length ? (len = questions.length) : (len = length);

  // Tarviiko käyttää statea näihin kaikkiin vai normi muuttujia??

  console.log("oikea: ", questions[index].answer);
  console.log("vastaus: ", answer);

  const handleSelect = (selected) => {
    if (selected === "A") {
      setAnswer(questions[index].option_a);
    } else if (selected === "B") {
      setAnswer(questions[index].option_b);
    } else if (selected === "C") {
      setAnswer(questions[index].option_c);
    } else if (selected === "D") {
      setAnswer(questions[index].option_d);
    }
  };

  const updateCorrect = () => {
    if (questions[index].option_a === questions[index].answer) {
      setStyleA(correctStyle);
    } else if (questions[index].option_b === questions[index].answer) {
      setStyleB(correctStyle);
    } else if (questions[index].option_c === questions[index].answer) {
      setStyleC(correctStyle);
    } else {
      setStyleD(correctStyle);
    }
  };

  const updateIncorrect = () => {
    if (questions[index].option_a === answer) {
      setStyleA(incorrectStyle);
    } else if (questions[index].option_b === answer) {
      setStyleB(incorrectStyle);
    } else if (questions[index].option_c === answer) {
      setStyleC(incorrectStyle);
    } else {
      setStyleD(incorrectStyle);
    }
  };

  const resetStyles = () => {
    setStyleA(defaultStyle);
    setStyleB(defaultStyle);
    setStyleC(defaultStyle);
    setStyleD(defaultStyle);
  };

  const checkAnswer = async () => {
    console.log("here here");
    updateCorrect();
    if (answer === questions[index].answer) {
      setCorrect(correct + 1);
      setMessageStyle("success");
      setMessage("Oikea vastaus!");
      setTimeout(() => {
        resetStyles();
        setMessage(null);
        setMessageStyle("");
        setAnswer(null);
        navigate("/game", {
          state: {
            questions: questions,
            length: length,
            index: index + 1,
          },
        });
      }, 3000);
    } else {
      updateIncorrect();
      setMessageStyle("danger");
      setMessage(`Väärin meni, oikea vastaus ${questions[index].answer}`);
      setTimeout(() => {
        resetStyles();
        setMessage(null);
        setMessageStyle("");
        setAnswer(null);
        navigate("/game", {
          state: {
            questions: questions,
            length: length,
            index: index + 1,
          },
        });
      }, 3000);
    }
  };

  if (index === len) {
    return (
      <ScorePage
        correct={correct}
        total={len}
        category={questions[0].category}
      />
    );
  }
  return (
    <Container className="p-sm-3 p-0 game_view">
      <Alert variant={messageStyle}>{message}</Alert>
      <Card className="mb-3 mx-auto w-100 shadow game_view align-items-center">
        <Card.Body>
          <Card.Title
            className="fs-5 d-flex mb-4 mx-auto game_view align-items-center"
            style={{ height: "12rem" }}
          >
            {questions[index].question}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Kysymys {index + 1} / {len}
          </Card.Subtitle>
          <ToggleButtonGroup
            className="mx-auto w-100"
            vertical
            type="checkbox"
            value={answer}
          >
            <ToggleButton
              value={questions[index].option_a}
              variant={styleA}
              disabled={message}
              onClick={() => handleSelect("A")}
            >
              A: {questions[index].option_a}
            </ToggleButton>
            <ToggleButton
              value={questions[index].option_b}
              variant={styleB}
              disabled={message}
              onClick={() => handleSelect("B")}
            >
              B: {questions[index].option_b}
            </ToggleButton>
            <ToggleButton
              value={questions[index].option_c}
              variant={styleC}
              disabled={message}
              onClick={() => handleSelect("C")}
            >
              C: {questions[index].option_c}
            </ToggleButton>
            <ToggleButton
              value={questions[index].option_d}
              variant={styleD}
              disabled={message}
              onClick={() => handleSelect("D")}
            >
              D: {questions[index].option_d}
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            className="d-grid gap-2 mx-auto w-100"
            variant="secondary"
            onClick={checkAnswer}
            disabled={!answer}
          >
            Lähetä vastaus
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GamePage;
