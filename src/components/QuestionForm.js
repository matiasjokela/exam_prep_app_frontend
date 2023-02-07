import { useState } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import questionService from "../services/questions";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [option_a, setOption_a] = useState("");
  const [option_b, setOption_b] = useState("");
  const [option_c, setOption_c] = useState("");
  const [option_d, setOption_d] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [category, setCategory] = useState("");
  const location = useLocation();
  let user = null;

  try {
    user = location.state.user;
  } catch (e) {
    console.log(e);
  }

  const checkDuplicates = (answers) => {
    for (let i = 0; i < answers.length - 1; i++) {
      if (answers.includes(answers[i], i + 1)) {
        return true;
      }
    }
    return false;
  };

  const getCorrectAnswer = () => {
    if (correctOption === "A") {
      return option_a;
    } else if (correctOption === "B") {
      return option_b;
    } else if (correctOption === "C") {
      return option_c;
    } else if (correctOption === "D") {
      return option_d;
    }
  };

  const handleAddQuestion = async (event) => {
    event.preventDefault();
    const correctAnswer = getCorrectAnswer();
    if (checkDuplicates([option_a, option_b, option_c, option_d])) {
      window.confirm(
        "Kysymystä ei lisätty, vastausvaihtoehtojen tulee olla uniikkeja"
      );
    } else {
      const newQuestion = {
        question: question,
        option_a: option_a,
        option_b: option_b,
        option_c: option_c,
        option_d: option_d,
        answer: correctAnswer,
        category: category,
        userId: user.id,
      };
      await questionService.addQuestion(newQuestion);
    }
    window.location.reload(false);
  };

  return (
    <Container id="add_question">
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
              defaultValue=""
            >
              <option value="" disabled>
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
              defaultValue=""
            >
              <option value="" disabled>
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
