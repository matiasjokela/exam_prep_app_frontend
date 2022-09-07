import Button from './Button'
import ButtonList from './ButtonList'

const GamePage = () => {

	// Kysymykset loopataan jostain, mistä?
	return (
		<>
			<h2>Mikä päivä tänään on?</h2>
			<div>
				A: <Button text='Vapaapäivä'/>
			</div>
			<div>
				B: <Button text='Pääpäivä'/>
			</div>
			<div>
				C: <Button text='Tiistai'/>
			</div>
			<div>
				D: <Button text='Tää päivä'/>
			</div>
			<div>
				<Button text='Lähetä vastaus'/>
			</div>
		</>
	)
}

export default GamePage