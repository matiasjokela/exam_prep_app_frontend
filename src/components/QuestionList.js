import userService from "../services/user";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Container, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import questionService from "../services/questions";
import { ListGroup } from "react-bootstrap";
import QuestionItem from "./QuestionItem";

const QuestionList = ({ questions }) => {
  const [updatedUser, setUpdatedUser] = useState(null);

  const handleDelete = () => {
    console.log("pois kysymys");
  };

  return (
    <Container id="question_list">
      <ListGroup style={{ maxHeight: "580px", overflowY: "scroll" }}>
        {questions.map((question) => (
          <QuestionItem question={question} />
        ))}
      </ListGroup>
    </Container>
  );
};

export default QuestionList;
