import Button from './Button'
import { useState } from 'react'
import ScorePage from './ScorePage'

const Notification = ({ message, style }) => {
	return (
		<div className={style}>
			{message}
		</div>
	)
}

// Mikä paras tapa näyttää valittu nappi keltaisena jne???


const GamePage = ({ questions }) => {
	const [index, setIndex] = useState(0)
	const [correct, setCorrect] = useState(0)
	const [answer, setAnswer] = useState(null)
	const [message, setMessage] = useState(null)
	const [messageStyle, setMessageStyle] = useState('')
	const [buttonStyle, setButtonStyle] = useState('button_normal')

	// Tarviiko käyttää statea näihin kaikkiin vai normi muuttujia??
	
	const checkAnswer = () => {
		if (answer === questions[index].answer) {
			setCorrect(correct + 1)
			setMessageStyle('correct')
			setMessage('Oikea vastaus!')
			setTimeout(() => {
				setMessage(null)
				setMessageStyle('')
				setIndex(index + 1)
			}, 3000)
		} else {
			setMessageStyle('incorrect')
			setMessage(`Väärin meni, oikea vastaus ${questions[index].answer}`)
			setTimeout(() => {
				setMessage(null)
				setMessageStyle('')
				setIndex(index + 1)
			}, 3000)
		}
		
	}

	if (index === questions.length)
	{
		return (
			<ScorePage correct={correct} total={questions.length} />
		)
	}
	return (
		<>
			<Notification style={messageStyle} message={message}/>
			<h2>{questions[index].question}</h2>
			<div>
				A: <Button style='button_normal' text={questions[index].option_a} handleClick={() => setAnswer(questions[index].option_a)}/>
			</div>
			<div>
				B: <Button style='button_right' text={questions[index].option_b} handleClick={() => setAnswer(questions[index].option_b)}/>
			</div>
			<div>
				C: <Button style='button_wrong' text={questions[index].option_c} handleClick={() => setAnswer(questions[index].option_c)}/>
			</div>
			<div>
				D: <Button style='button_selected' text={questions[index].option_d} handleClick={() => setAnswer(questions[index].option_d)}/>
			</div>
			<div>
				<Button style='button_normal' text='Lähetä vastaus' handleClick={checkAnswer}/>
			</div>
		</>
	)
}

export default GamePage