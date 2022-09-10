import { useState, useEffect } from 'react'
import Button from './Button'
import ButtonList from './ButtonList'
import GamePage from "./GamePage"
import questionService from '../services/questions'
import LoginPage from './LoginPage'


const LandingPage = () => {
	const [questions, setQuestions] = useState([])
	const [view, setView] = useState('Landing')
	const [category, setCategory] = useState(null)
	const [categoryStyles, setCategoryStyles] = useState(['category_button_normal', 'category_button_normal', 'category_button_normal'])

	useEffect(() => {
		questionService.getAll().then(questions => setQuestions(questions))
	}, [])

	const handleSelect = (selected) => {
		if (selected === 'matematiikka') {
			setCategory('matematiikka')
			setCategoryStyles(['category_button_selected', 'category_button_normal', 'category_button_normal'])
		} else if (selected === 'englanti') {
			setCategory('englanti')
			setCategoryStyles(['category_button_normal', 'category_button_selected', 'category_button_normal'])
		} else if (selected === 'biologia') {
			setCategory('biologia')
			setCategoryStyles(['category_button_normal', 'category_button_normal', 'category_button_selected'])
		}
	}
	// if (category === 'matematiikka') {
	// 	setCategoryStyles(['category_button_selected', 'category_button_normal', 'category_button_normal'])
	// } else if (category === 'englanti') {
	// 	setCategoryStyles(['category_button_normal', 'category_button_selected', 'category_button_normal'])
	// } else if (category === 'biologia') {
	// 	setCategoryStyles(['category_button_normal', 'category_button_normal', 'category_button_selected'])
	// }




	if (view === 'Game') {
		let filteredQuestions = questions.filter(question => question.category.includes(category))
		let shuffledQuestions = filteredQuestions.map(value => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)
		console.log(shuffledQuestions)
		return (
			<GamePage questions={shuffledQuestions}/>
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
			<h2>Valitse aihe</h2>
			<div>
				<Button style={categoryStyles[0]} text='Matematiikka' handleClick={() => handleSelect('matematiikka')}/>
				<Button style={categoryStyles[1]} text='Englanti' handleClick={() => handleSelect('englanti')}/>
			</div>
			<div>
				<Button style={categoryStyles[2]} text='Biologia' handleClick={() => handleSelect('biologia')}/>
			</div>
			{!category ? <div>valitse aihe</div>: <Button text='Pelaa' style='button_normal' handleClick={() => setView('Game')} />}
		</div>
	)
}

export default LandingPage
