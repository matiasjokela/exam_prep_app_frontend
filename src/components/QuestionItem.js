import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import questionService from "../services/questions";

const bg = "#F3EBDD";
const textColor = "#2A2922";
const correct = "#7CAA2D";

const MoreInfo = ({ question }) => {
  const handleDelete = () => {
    if (
      window.confirm(
        `Haluatko varmasti poistaa kysymyksen ${question.question}`
      )
    ) {
      questionService.deleteQuestion(question.id);
      window.location.reload(false);
    }
  };

  return (
    <>
      <ListGroup.Item
        key={question.option_a}
        className="mt-2"
        style={{
          color: textColor,
          backgroundColor: question.option_a === question.answer ? correct : bg,
          borderRadius: "10px",
          border: "1px solid gray",
          fontSize: "14px",
        }}
      >
        A: {question.option_a}
      </ListGroup.Item>
      <ListGroup.Item
        key={question.option_b}
        style={{
          color: textColor,
          backgroundColor: question.option_b === question.answer ? correct : bg,
          borderRadius: "10px",
          border: "1px solid gray",
          fontSize: "14px",
        }}
      >
        B: {question.option_b}
      </ListGroup.Item>
      <ListGroup.Item
        key={question.option_c}
        style={{
          color: textColor,
          backgroundColor: question.option_c === question.answer ? correct : bg,
          borderRadius: "10px",
          border: "1px solid gray",
          fontSize: "14px",
        }}
      >
        C: {question.option_c}
      </ListGroup.Item>
      <ListGroup.Item
        key={question.option_d}
        className="mb-2 "
        style={{
          color: textColor,
          backgroundColor: question.option_d === question.answer ? correct : bg,
          borderRadius: "10px",
          border: "1px solid gray",
          fontSize: "14px",
        }}
      >
        D: {question.option_d}
      </ListGroup.Item>
      <ListGroup.Item
        key={question.category}
        className="mb-2 "
        style={{
          color: textColor,
          backgroundColor: bg,
          borderRadius: "10px",
          border: "1px solid gray",
          fontSize: "14px",
        }}
      >
        Kategoria: {question.category}
      </ListGroup.Item>
      <Button variant="dark" onClick={() => handleDelete(question)}>
        Poista kysymys
      </Button>
    </>
  );
};

const QuestionItem = ({ question }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <ListGroup.Item
      key={question.id}
      className="mb-2"
      style={{
        color: textColor,
        backgroundColor: bg,
        borderRadius: "10px",
        border: "1px solid gray",
      }}
      onClick={handleClick}
    >
      {question.question}
      {isClicked && <MoreInfo question={question} />}
    </ListGroup.Item>
  );
};

export default QuestionItem;

/*
    <ListGroup.Item
      key={question.id}
      className="mb-2"
      variant="outline-dark"
      style={{
        color: textColor,
        backgroundColor: bg,
        borderRadius: "10px",
        border: "1px solid gray",
      }}
    >
      {question.question}
    </ListGroup.Item>
	*/
