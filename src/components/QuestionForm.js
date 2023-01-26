import userService from "../services/user";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Container, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import questionService from "../services/questions";

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [option_a, setOption_a] = useState("");
  const [option_b, setOption_b] = useState("");
  const [option_c, setOption_c] = useState("");
  const [option_d, setOption_d] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const location = useLocation();
  let user = null;

  try {
    user = location.state.user;
  } catch (e) {
    console.log(e);
  }

  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    if (user) {
      userService
        .getById(user.id)
        .then((returnedUser) => setUpdatedUser(returnedUser));
    }
  }, [user]);

  console.log("user at /questions", user);
  console.log("questions at /questions", questions);
  console.log("type", typeof user.id);

  const handleAddQuestion = async (event) => {
    event.preventDefault();
    console.log("Lisää kyssäri");
  };

  console.log("category", category);

  return (
    <Container
      id="add_question"
      className="mb-3 shadow rounded p-sm-4 col-sm-6"
    >
      <Form onSubmit={handleAddQuestion}>
        <Form.Group className="mb-3">
          <Form.Label>
            Kysymys{" "}
            <span className="text-muted" style={{ fontSize: "0.8em" }}>
              {question.length} / 325
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            className="mb-3"
            maxLength={325}
            onChange={(e) => setQuestion(e.target.value)}
          ></Form.Control>
          <Form.Label>
            Vaihtoehto A{" "}
            <span className="text-muted" style={{ fontSize: "0.8em" }}>
              {option_a.length} / 190
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            maxLength={190}
            onChange={(e) => setOption_a(e.target.value)}
          ></Form.Control>
          <Form.Label>
            Vaihtoehto B{" "}
            <span className="text-muted" style={{ fontSize: "0.8em" }}>
              {option_b.length} / 190
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            onChange={(e) => setOption_b(e.target.value)}
          ></Form.Control>
          <Form.Label>
            Vaihtoehto C{" "}
            <span className="text-muted" style={{ fontSize: "0.8em" }}>
              {option_c.length} / 190
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            onChange={(e) => setOption_c(e.target.value)}
          ></Form.Control>
          <Form.Label>
            Vaihtoehto D{" "}
            <span className="text-muted" style={{ fontSize: "0.8em" }}>
              {option_d.length} / 190
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            onChange={(e) => setOption_d(e.target.value)}
            className="mb-3"
          ></Form.Control>
          <div className="d-flex justify-content-between">
            <Form.Control
              as="select"
              onChange={(e) => setCategory(e.target.value)}
              className="mb-3"
            >
              <option value="" disabled selected>
                Valitse kategoria
              </option>
              <option value="fysiikka">Fysiikka</option>
              <option value="biologia">Biologia</option>
              <option value="kemia">Kemia</option>
            </Form.Control>
            <Form.Control
              as="select"
              onChange={(e) => setCorrectOption(e.target.value)}
              className="mb-3"
            >
              <option value="" disabled selected>
                Valitse oikea vastaus
              </option>
              <option value="A">Vaihtoehto A</option>
              <option value="B">Vaihtoehto B</option>
              <option value="C">Vaihtoehto C</option>
              <option value="D">Vaihtoehto D</option>
            </Form.Control>
          </div>
        </Form.Group>

        <Button
          className="form-button mb-3"
          variant="primary"
          type="submit"
          disabled={
            !category ||
            !question ||
            !option_a ||
            !option_b ||
            !option_c ||
            !option_d ||
            !correctOption
          }
        >
          Lisää kysymys
        </Button>
      </Form>
    </Container>
  );
};

export default QuestionForm;