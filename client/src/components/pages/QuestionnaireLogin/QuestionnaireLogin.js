import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionnaireLogin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userInputtedPassword: '',
			inputFocused: false,
		};
	}

	checkPassword() {
		if (
			this.state.userInputtedPassword.toLowerCase().trim() ===
			this.props.password.toLowerCase()
		) {
			this.props.handleSuccessfulPage();
		} else {
			let errorMessage = `Incorrect password`;

			this.props.handlePageError(errorMessage);
		}
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			this.checkPassword();
		}
	}

	handleChange(e) {
		this.setState({
			userInputtedPassword: e.target.value,
		});
	}

	render() {
		return (
			<div className="questionnaire-login" style={{ padding: '1em' }}>
				<div>{this.state.showError && 'Incorrect Password'}</div>
				<div className="input-group">
					<input
						style={{ borderBottom: 0 }}
						type="text"
						// placeholder="Password"
						onKeyPress={this.handleKeyPress.bind(this)}
						onChange={this.handleChange.bind(this)}
						onFocus={() => {
							this.setState({ inputFocused: true });
						}}
						onBlur={() => {
							this.setState({ inputFocused: false });
						}}
					/>

					<div
						className={`placeholder ${
							this.state.inputFocused ? 'focused' : ''
						}`}
					>
						Password
					</div>
				</div>
				{this.state.userInputtedPassword.length > 0 && (
					<button
						style={{ marginTop: '2em' }}
						onClick={this.checkPassword.bind(this)}
					>
						Enter
					</button>
				)}
			</div>
		);
	}
}

QuestionnaireLogin.propTypes = {
	handleSuccessfulPage: PropTypes.func,
	handleSubmitData: PropTypes.func,
	handlePageError: PropTypes.func,
	password: PropTypes.string,
	questionnaireId: PropTypes.string,
};

export default QuestionnaireLogin;
