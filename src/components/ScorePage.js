import LandingPage from './LandingPage'
import Button from './Button'
import { useState } from 'react'

const ScorePage = ({ correct, total }) => {
	const [ok, setOk] = useState(0)

	if (ok === 1) {
		return (
			<LandingPage />
		)
	}

	return (
		<>
			<h2>Hello World!</h2>
			<div>Sait {correct} / {total} oikein</div>
			<Button text='OK' handleClick={() => setOk(1)}/>
		</>
	)
}

export default ScorePage