import React, { Component } from 'react'
import { Button, Form, Message, Modal, Icon, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class QuestionnaireRegistration extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			phone: '',
			errorMessages: [],
		}
	}

	validationRules = {
		name: value => {
			if (value.length > 0) {
				return true
			} else {
				return 'Invalid name'
			}
		},
		email: email => {
			var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			let passed = emailRegex.test(String(email).toLowerCase())

			if (passed === true) {
				return true
			} else {
				return 'Invalid email'
			}
		},
		phone: phone => {
			var phoneRegex = /[0-9]/g
			let passed = phoneRegex.test(String(phone))

			if (passed === true && phone.length >= 7) {
				return true
			} else {
				return 'Invalid phone number'
			}
		},
	}

	validateForm(callback) {
		let success = true
		let messages = []
		const fieldsToCheck = ['name', 'email', 'phone']

		Object.keys(this.state).forEach(key => {
			if (fieldsToCheck.includes(key)) {
				if (this.validationRules[key]) {
					let result = this.validationRules[key](this.state[key])

					if (result === true) {
					} else {
						success = false
						messages.push(result)
					}
				}
			}
		})

		callback(success, messages)
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	handleSubmit() {
		this.validateForm((success, message) => {
			if (success === true) {
				this.setState({
					errorMessages: [],
				})
				this.props.handleConsolidateData(this.state)
				this.props.handleSuccessfulPage()
			} else {
				this.setState({
					errorMessages: message,
				})
			}
		})
	}

	render() {
		return (
			<div
				className="questionnaire-registration"
				style={{ padding: '0 1em 0' }}
			>
				<div className="error-message">
					{this.state.errorMessages.map(message => {
						return <p>{message}</p>
					})}
				</div>
				<div className="input-group">
					<input
						placeholder="Name"
						name="name"
						value={this.state.name}
						onChange={this.handleChange.bind(this)}
					/>
				</div>

				<div className="input-group">
					<input
						placeholder="Email"
						name="email"
						value={this.state.email}
						onChange={this.handleChange.bind(this)}
					/>
				</div>

				<div className="input-group">
					<input
						placeholder="Phone Number"
						name="phone"
						maxLength="10"
						value={this.state.phone}
						onChange={this.handleChange.bind(this)}
					/>
				</div>

				<button onClick={this.handleSubmit.bind(this)}>Next</button>
			</div>
		)
	}
}

QuestionnaireRegistration.propTypes = {
	handleSuccessfulPage: PropTypes.func,
	handleSubmitData: PropTypes.func,
	handlePageError: PropTypes.func,
	questionnaireId: PropTypes.string,
}

export default QuestionnaireRegistration
