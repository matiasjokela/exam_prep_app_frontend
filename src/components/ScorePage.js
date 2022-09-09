import LandingPage from './LandingPage'
import Button from 'react-bootstrap/Button'
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
		<Card className='mx-auto' style={{ width: '18rem'}}>
			<div className='text-center d-grid gap-2'>
				<h2>Hello World!</h2>
				<div>Sait {correct} / {total} oikein</div>
				<Button className='btn-lg' variant='primary' onClick={() => setOk(1)}>OK</Button>
			</div>
		</Card>

	)
}

export default ScorePage