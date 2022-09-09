import LandingPage from './LandingPage'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

const ScorePage = ({ correct, total }) => {
	const [ok, setOk] = useState(0)

	if (ok === 1) {
		return (
			<LandingPage />
		)
	}

	return (
		<div className='text-center'>
			<h2>Hello World!</h2>
			<div>Sait {correct} / {total} oikein</div>
			<Button variant='primary' onClick={() => setOk(1)}>OK</Button>
		</div>
	)
}

export default ScorePage