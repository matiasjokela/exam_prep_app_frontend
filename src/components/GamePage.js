//import Button from 'react-bootstrap/Button'
//import Card from 'react-bootstrap/Card'
import Button from "./Button";
import Notification from "./Notification";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import ScorePage from "./ScorePage";

// Mikä paras tapa näyttää valittu nappi keltaisena jne???

const GamePage = ({ questions, length }) => {
  const defaultStyle = "button button_normal";
  const selectedStyle = "button button_selected";
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState("");
  const [buttonStyles, setButtonStyles] = useState([
    defaultStyle,
    defaultStyle,
    defaultStyle,
    defaultStyle,
  ]);
  let len;

  questions.length < length ? (len = questions.length) : (len = length);

  // Tarviiko käyttää statea näihin kaikkiin vai normi muuttujia??

  const handleSelect = (selected) => {
    if (selected === "A") {
      setAnswer(questions[index].option_a);
      setButtonStyles([
        selectedStyle,
        defaultStyle,
        defaultStyle,
        defaultStyle,
      ]);
    } else if (selected === "B") {
      setAnswer(questions[index].option_b);
      setButtonStyles([
        defaultStyle,
        selectedStyle,
        defaultStyle,
        defaultStyle,
      ]);
    } else if (selected === "C") {
      setAnswer(questions[index].option_c);
      setButtonStyles([
        defaultStyle,
        defaultStyle,
        selectedStyle,
        defaultStyle,
      ]);
    } else if (selected === "D") {
      setAnswer(questions[index].option_d);
      setButtonStyles([
        defaultStyle,
        defaultStyle,
        defaultStyle,
        selectedStyle,
      ]);
    }
  };

  const checkAnswer = () => {
    if (answer === questions[index].answer) {
      setCorrect(correct + 1);
      setMessageStyle("notification correct");
      setMessage("Oikea vastaus!");
      setTimeout(() => {
        setMessage(null);
        setMessageStyle("");
        setIndex(index + 1);
      }, 500);
    } else {
      setMessageStyle("notification incorrect");
      setMessage(`Väärin meni, oikea vastaus ${questions[index].answer}`);
      setTimeout(() => {
        setMessage(null);
        setMessageStyle("");
        setIndex(index + 1);
      }, 500);
    }
    setAnswer(null);
    setButtonStyles([defaultStyle, defaultStyle, defaultStyle, defaultStyle]);
  };

  if (index === len) {
    return <ScorePage correct={correct} total={len} />;
  }
  return (
    <div className="card_view">
      <Notification style={messageStyle} message={message} />
      <div className="content_box">
        <div className="question">
          <div> {questions[index].header} </div>
          <div>{questions[index].question}</div>
        </div>
      </div>
      <Button
        text={questions[index].option_a}
        handleClick={() => handleSelect("A")}
        style={buttonStyles[0]}
      />
      <Button
        text={questions[index].option_b}
        handleClick={() => handleSelect("B")}
        style={buttonStyles[1]}
      />
      <Button
        text={questions[index].option_c}
        handleClick={() => handleSelect("C")}
        style={buttonStyles[2]}
      />
      <Button
        text={questions[index].option_d}
        handleClick={() => handleSelect("D")}
        style={buttonStyles[3]}
      />
      <Button
        text="Lähetä vastaus"
        handleClick={checkAnswer}
        style="button button_submit"
      />
    </div>
  );
};

export default GamePage;

// Bootstrap

{
  /* <Card className='mx-auto' style={{ width: '18rem' }}>
<div className='text-center'>
	<Alert variant={messageStyle}>
		{message}
	</Alert>
	<h2>{questions[index].question}</h2>
	<div className='d-grid gap-2'>
		<Button className='btn-lg' variant={buttonStyles[0]} onClick={() => handleSelect('A')}>A: {questions[index].option_a}</Button>
		<Button className='btn-lg' variant={buttonStyles[1]} onClick={() => handleSelect('B')}>B: {questions[index].option_b}</Button>
		<Button className='btn-lg' variant={buttonStyles[2]} onClick={() => handleSelect('C')}>C: {questions[index].option_c}</Button>
		<Button className='btn-lg' variant={buttonStyles[3]} onClick={() => handleSelect('D')}>D: {questions[index].option_d}</Button>
		<Button className='btn-lg' variant='dark' onClick={checkAnswer}>Lähetä vastaus</Button>
	</div>
</div>
</Card> */
}
