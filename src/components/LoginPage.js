import Button from './Button'

const LoginPage = () => {


	return (
		<>
			<h2>Kirjaudu sisään</h2>
			<form>
				<div>
					käyttäjätunnus
					<input id='username'/>
				</div>
				<div>
					salasana
					<input id='password'/>
				</div>
				<div>
					<Button text='kirjaudu'/>
					<Button text='uusi käyttäjä'/>
				</div>
			</form>
		</>
	)
}

export default LoginPage