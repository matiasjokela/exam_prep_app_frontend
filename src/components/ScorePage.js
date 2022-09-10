import LandingPage from './LandingPage'
import Button from './Button'
import { useState } from 'react'
import Card from 'react-bootstrap/Card'

const ScorePage = ({ correct, total }) => {
	const [ok, setOk] = useState(0)

	if (ok === 1) {
		return (
			<LandingPage />
		)
	}

	return (
		<div className='card_view'>
			<h2>Hello World!</h2>
			<div>Sait {correct} / {total} oikein</div>
			<Button text='OK' style='button_normal' active handleClick={() => setOk(1)} />
		</div>
	)
}

export default ScorePage