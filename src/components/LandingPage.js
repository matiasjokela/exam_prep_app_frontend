import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonList from './ButtonList'
import Container from 'react-bootstrap/Container'
import GamePage from "./GamePage"
import questionService from '../services/questions'
import Card from 'react-bootstrap/Card'

const LandingPage = () => {
	const [questions, setQuestions] = useState([])
	const [view, setView] = useState('Landing')

	useEffect(() => {
		questionService.getAll().then(questions => setQuestions(questions))
	}, [])

	if (view === 'Game') {
		return (
			<GamePage questions={questions}/>
		)
	}

	return (
		<Card className='mx-auto' style={{ width: '18rem' }}>
			<div className='text-center d-grid gap-2'>
				<h2>Hello World!</h2>
				<Button className='btn-lg' variant="warning" active onClick={() => setView('Game')}>Pelaa</Button>
			</div>
		</Card>

	)
}

export default LandingPage

//<Button style='button_normal' text='Pelaa' handleClick={() => setView('Game')}/>