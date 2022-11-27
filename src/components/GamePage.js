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

// Mikä paras tapa näyttää valittu nappi keltaisena jne???

const GamePage = ({ questions, length }) => {
  const defaultStyle = "outline-dark";
  const correctStyle = "success";
  const incorrectStyle = "danger";
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState("");
  const [styleA, setStyleA] = useState(defaultStyle);
  const [styleB, setStyleB] = useState(defaultStyle);
  const [styleC, setStyleC] = useState(defaultStyle);
  const [styleD, setStyleD] = useState(defaultStyle);

  let len;

  questions.length < length ? (len = questions.length) : (len = length);

  // Tarviiko käyttää statea näihin kaikkiin vai normi muuttujia??

  console.log("oikea: ", questions[index].answer);
  console.log("message: ", messageStyle);

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
      setStyleD(correctStyle);
    }
  };

  const resetStyles = () => {
    setStyleA(defaultStyle);
    setStyleB(defaultStyle);
    setStyleC(defaultStyle);
    setStyleD(defaultStyle);
  };

  const checkAnswer = () => {
    updateCorrect();
    if (answer === questions[index].answer) {
      setCorrect(correct + 1);
      setMessageStyle("success");
      setMessage("Oikea vastaus!");
      setTimeout(() => {
        resetStyles();
        setMessage(null);
        setMessageStyle("");
        setIndex(index + 1);
      }, 3000);
    } else {
      updateIncorrect();
      setMessageStyle("danger");
      setMessage(`Väärin meni, oikea vastaus ${questions[index].answer}`);
      setTimeout(() => {
        resetStyles();
        setMessage(null);
        setMessageStyle("");
        setIndex(index + 1);
      }, 3000);
    }
    setAnswer(null);
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
    <Container className="p-sm-3 p-0 card_view">
      <Alert variant={messageStyle}>{message}</Alert>
      <Card className="mb-3 mx-auto w-100 shadow card_view align-items-center">
        <Card.Body>
          <Card.Title
            className="fs-5 d-flex mb-4 mx-auto card_view align-items-center"
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
