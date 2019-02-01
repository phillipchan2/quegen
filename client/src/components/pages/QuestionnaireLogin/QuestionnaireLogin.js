import React, { Component } from 'react'
import PropTypes from 'prop-types'

class QuestionnaireLogin extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userInputtedPassword: '',
		}
	}

	checkPassword() {
		if (this.state.userInputtedPassword === this.props.password) {
			this.props.handleSuccessfulPage()
		} else {
			let errorMessage = `Incorrect password`

			this.props.handlePageError(errorMessage)
		}
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			this.checkPassword()
		}
	}

	handleChange(e) {
		this.setState({
			userInputtedPassword: e.target.value,
		})
	}

	render() {
		return (
			<div
				className="questionnaire-login"
				style={{ padding: '3em 1em 1em 1em' }}
			>
				<div>{this.state.showError && 'Incorrect Password'}</div>
				<div>Enter Password</div>
				<div className="input-group">
					<input
						type="text"
						onKeyPress={this.handleKeyPress.bind(this)}
						onChange={this.handleChange.bind(this)}
					/>
				</div>
				<button onClick={this.checkPassword.bind(this)}>Enter</button>
			</div>
		)
	}
}

QuestionnaireLogin.propTypes = {
	handleSuccessfulPage: PropTypes.func,
	handleSubmitData: PropTypes.func,
	handlePageError: PropTypes.func,
	password: PropTypes.string,
	questionnaireId: PropTypes.string,
}

export default QuestionnaireLogin
