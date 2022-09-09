import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonList from './ButtonList'
import Container from 'react-bootstrap/Container'
import GamePage from "./GamePage"
import questionService from '../services/questions'

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
			<div className='text-center bg-light'>
				<h2>Hello World!</h2>
				<Button variant="warning" active onClick={() => setView('Game')}>Pelaa</Button>
			</div>
	)
}

export default LandingPage

//<Button style='button_normal' text='Pelaa' handleClick={() => setView('Game')}/>