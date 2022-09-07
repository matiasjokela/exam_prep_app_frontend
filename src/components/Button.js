import PropTypes from 'prop-types'

// style ja type pitää ottaa argumentteina? 

const Button = ({ handleClick, text, style }) => (
	<button onClick={handleClick} className={style}>
		{text}
	</button>
)

Button.propTypes = {
	text: PropTypes.string.isRequired
}

export default Button