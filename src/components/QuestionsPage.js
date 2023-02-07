import { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import questionService from "../services/questions";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("list");
  const [title, setTitle] = useState("Kysymyksesi:");
  const [viewButtonText, setviewButtonText] = useState("Lisää kysymys");
  const location = useLocation();
  let user = null;

  const navigate = useNavigate();

  try {
    user = location.state.user;
  } catch (e) {
    console.log(e);
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    questionService.getAll().then((questions) => setQuestions(questions));
  }, []);

  let filteredQuestions = questions.filter(
    (question) =>
      question && question.userId && question.userId.includes(user.id)
  );

  const toggleView = () => {
    if (view === "list") {
      setView("form");
      setTitle("Lisää kysymys");
      setviewButtonText("Kysymyslistaan");
    } else {
      setView("list");
      setTitle("Kysymyksesi:");
      setviewButtonText("Lisää kysymys");
    }
    view === "list" ? setView("form") : setView("list");
  };

  return (
    <Container
      id="questions_page"
      className="mb-3 shadow rounded p-sm-4 col-sm-6"
    >
      <Container className="mb-3">
        <ButtonGroup>
          <Button
            variant="outline-dark"
            className="mb-3"
            style={{ width: "130px" }}
            onClick={() =>
              navigate("/", {
                state: {
                  user: user,
                },
              })
            }
          >
            Takaisin
          </Button>
          <Button
            variant="outline-dark"
            className="mb-3"
            style={{ width: "130px" }}
            onClick={toggleView}
          >
            {viewButtonText}
          </Button>
        </ButtonGroup>

        <h2>{title}</h2>
      </Container>

      {view === "list" ? (
        <QuestionList questions={filteredQuestions} />
      ) : (
        <QuestionForm />
      )}
    </Container>
  );
};

export default QuestionsPage;
