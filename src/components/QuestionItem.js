import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

const bg = "#F3EBDD";
const textColor = "#2A2922";

const MoreInfo = ({ question }) => {
  const handleDelete = () => {
    console.log("pois kysymys", question);
  };

  return (
    <>
      <ListGroup.Item
        key={question.option_a}
        className="mt-2"
        style={{
          color: textColor,
          backgroundColor: bg,
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
          backgroundColor: bg,
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
          backgroundColor: bg,
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
          backgroundColor: bg,
          borderRadius: "10px",
          border: "1px solid gray",
          fontSize: "14px",
        }}
      >
        D: {question.option_d}
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
