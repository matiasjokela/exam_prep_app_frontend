import LoginPage from "./components/LoginPage"
import LandingPage from "./components/LandingPage"
import userService from './services/user'
import { useState } from 'react'


const App = () => {
	const user = window.localStorage.getItem('loggedExamPrepUser')
	
	console.log('user', user)


	// Huom, tässäkin täytyy validoida käyttäjä!!!!!!!!
	return (
		<div className='card_view'>
			{!user ? <LoginPage /> : <LandingPage />}
		</div>
	)
}



export default App
