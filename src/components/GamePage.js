import Button from './Button'
import ButtonList from './ButtonList'
import LandingPage from './LandingPage'
import { useState } from 'react'

const GamePage = ({ questions }) => {
	const [index, setIndex] = useState(0)
	const [correct, setCorrect] = useState(0)
	const [answer, setAnswer] = useState(null)
	console.log(questions)
	console.log(answer)

	// Tarviiko käyttää statea näihin kaikkiin vai normi muuttujia??
	
	const checkAnswer = () => {
		if (answer === questions[index].answer) {
			setCorrect(correct + 1)
		}
		setIndex(index + 1)
	}

	if (index === questions.length)
	{
		console.log(`oikein meni ${correct}/${questions.length}`)
		// Tässä ei mennä Landing pagelle vaan johonkin yhteenvetoon ja sielt sitten landingiin
		return (
			<LandingPage />
		)
	}
	return (
		<>
			<h2>{questions[index].question}</h2>
			<div>
				A: <Button text={questions[index].option_a} handleClick={() => setAnswer(questions[index].option_a)}/>
			</div>
			<div>
				B: <Button text={questions[index].option_b} handleClick={() => setAnswer(questions[index].option_b)}/>
			</div>
			<div>
				C: <Button text={questions[index].option_c} handleClick={() => setAnswer(questions[index].option_c)}/>
			</div>
			<div>
				D: <Button text={questions[index].option_d} handleClick={() => setAnswer(questions[index].option_d)}/>
			</div>
			<div>
				<Button text='Lähetä vastaus' handleClick={checkAnswer}/>
			</div>
		</>
	)
}

export default GamePage