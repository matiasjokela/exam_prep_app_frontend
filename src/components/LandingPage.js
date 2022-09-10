import { useState, useEffect } from 'react'
import Button from './Button'
import ButtonList from './ButtonList'
import GamePage from "./GamePage"
import questionService from '../services/questions'
import LoginPage from './LoginPage'


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
	} else if (view === 'Login') {
		return (
			<LoginPage />
		)
	}

	const handleLogout = () => {
		console.log('click')
		window.localStorage.removeItem('loggedExamPrepUser')
		setView('Login')
	}

	return (
		<div className='card_view'>
			<Button text='kirjaudu ulos' style='button_normal' handleClick={handleLogout}/>
			<h2>Hello World!</h2>
			<Button text='Pelaa' style='button_normal' handleClick={() => setView('Game')} />
		</div>
	)
}

export default LandingPage

//<Button style='button_normal' text='Pelaa' handleClick={() => setView('Game')}/>