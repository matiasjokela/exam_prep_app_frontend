import { useState, useEffect } from 'react'
import Button from './Button'
import ButtonList from './ButtonList'
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
		<div className='card_view'>
			<h2>Hello World!</h2>
			<Button text='Pelaa' style='button_normal' active handleClick={() => setView('Game')} />
		</div>
	)
}

export default LandingPage

//<Button style='button_normal' text='Pelaa' handleClick={() => setView('Game')}/>