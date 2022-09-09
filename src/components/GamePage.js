import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import ScorePage from './ScorePage'



// Mikä paras tapa näyttää valittu nappi keltaisena jne???


const GamePage = ({ questions }) => {
	const defaultStyle = 'primary'
	const selectedStyle = 'warning'
	const [index, setIndex] = useState(0)
	const [correct, setCorrect] = useState(0)
	const [answer, setAnswer] = useState(null)
	const [message, setMessage] = useState(null)
	const [messageStyle, setMessageStyle] = useState('')
	const [buttonStyles, setButtonStyles] = useState([defaultStyle, defaultStyle, defaultStyle, defaultStyle])

	// Tarviiko käyttää statea näihin kaikkiin vai normi muuttujia??

	const handleSelect = (selected) => {
		if (selected === 'A') {
			setAnswer(questions[index].option_a)
			setButtonStyles([selectedStyle, defaultStyle, defaultStyle, defaultStyle])
		} else if (selected === 'B') {
			setAnswer(questions[index].option_b)
			setButtonStyles([defaultStyle, selectedStyle, defaultStyle, defaultStyle])
		} else if (selected === 'C') {
			setAnswer(questions[index].option_c)
			setButtonStyles([defaultStyle, defaultStyle, selectedStyle, defaultStyle])
		} else if (selected === 'D') {
			setAnswer(questions[index].option_d)
			setButtonStyles([defaultStyle, defaultStyle, defaultStyle, selectedStyle])
		}
	}
	
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
		setAnswer(null)
		setButtonStyles([defaultStyle, defaultStyle, defaultStyle, defaultStyle])
	}

	if (index === questions.length)
	{
		return (
			<ScorePage correct={correct} total={questions.length} />
		)
	}
	return (
			<Card className='mx-auto' style={{ width: '18rem' }}>
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
			</Card>
	)
}

export default GamePage