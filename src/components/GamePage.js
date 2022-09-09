import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import ScorePage from './ScorePage'



// Mikä paras tapa näyttää valittu nappi keltaisena jne???


const GamePage = ({ questions }) => {
	const [index, setIndex] = useState(0)
	const [correct, setCorrect] = useState(0)
	const [answer, setAnswer] = useState(null)
	const [message, setMessage] = useState(null)
	const [messageStyle, setMessageStyle] = useState('')
	const [buttonStyle, setButtonStyle] = useState('warning')

	// Tarviiko käyttää statea näihin kaikkiin vai normi muuttujia??
	
	const checkAnswer = () => {
		if (answer === questions[index].answer) {
			setCorrect(correct + 1)
			setMessageStyle('success')
			setMessage('Oikea vastaus!')
			setTimeout(() => {
				setMessage(null)
				setMessageStyle('')
				setIndex(index + 1)
			}, 3000)
		} else {
			setMessageStyle('danger')
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
		<div className='text-center'>
			<Alert variant={messageStyle}>
				{message}
			</Alert>
			<h2>{questions[index].question}</h2>
			<div>
				<ButtonGroup className='me-6'>
					<Button className='btn-lg' variant={buttonStyle} onClick={() => setAnswer(questions[index].option_a)}>{questions[index].option_a}</Button>
					<Button variant="primary" onClick={() => setAnswer(questions[index].option_b)}>{questions[index].option_b}</Button>
				</ButtonGroup>
			</div>
			<div>
				<ButtonGroup className='btn-group btn-group-justified' >
					<Button variant="primary" onClick={() => setAnswer(questions[index].option_c)}>{questions[index].option_c}</Button>
					<Button variant="primary" onClick={() => setAnswer(questions[index].option_d)}>{questions[index].option_d}</Button>
				</ButtonGroup>
			</div>
			<div>
				<Button variant='primary' onClick={checkAnswer}>Lähetä vastaus</Button>
			</div>
		</div>
	)
}

export default GamePage