import { Container } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import QuestionItem from "./QuestionItem";

const bg = "#F3EBDD";
const textColor = "#2A2922";

const QuestionList = ({ questions }) => {
  return (
    <Container id="question_list">
      <ListGroup style={{ maxHeight: "580px", overflowY: "scroll" }}>
        {questions.length ? (
          questions.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))
        ) : (
          <ListGroup.Item
            key="no-questions"
            className="mt-2"
            style={{
              color: textColor,
              backgroundColor: bg,
              borderRadius: "10px",
              border: "1px solid gray",
              fontSize: "14px",
            }}
          >
            Et ole vielä lisännyt kysymyksiä
          </ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default QuestionList;
