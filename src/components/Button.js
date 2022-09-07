import PropTypes from 'prop-types'

// style ja type pitää ottaa argumentteina? 

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

Button.propTypes = {
	text: PropTypes.string.isRequired
}

export default Button