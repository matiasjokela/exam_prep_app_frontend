import userService from "../services/user";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import questionService from "../services/questions";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
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

  useEffect(() => {
    questionService.getAll().then((questions) => setQuestions(questions));
  }, []);

  useEffect(() => {
    if (user) {
      userService
        .getById(user.id)
        .then((returnedUser) => setUpdatedUser(returnedUser));
    }
  }, [user]);

  console.log("user at /questions", user);
  console.log("questions at /questions", questions);
  questions.map((question) => {
    if (question.user === 1) {
      console.log("jeejee");
    }
  });

  return <h1>hello world</h1>;
};

export default QuestionsPage;
