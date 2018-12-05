import React, { Component } from 'react';
import { Button, Form, Message, Modal, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class QuestionnaireRegistration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			phone: ''
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit() {
		this.props.handleSubmittedData(this.state);
		this.props.handleSuccessfulPage();
	}

	render() {
		return (
			<div>
				<Form>
					<Form.Field>
						<label>Name</label>
						<input
							placeholder="Name"
							name="name"
							value={this.state.name}
							onChange={this.handleChange.bind(this)}
						/>
					</Form.Field>
					<Form.Field>
						<label>Email</label>
						<input
							placeholder="Email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange.bind(this)}
						/>
					</Form.Field>
					<Form.Field>
						<label>Phone</label>
						<input
							placeholder="Phone Number"
							name="phone"
							value={this.state.phone}
							onChange={this.handleChange.bind(this)}
						/>
					</Form.Field>
				</Form>
				<Button onClick={this.handleSubmit.bind(this)}>Next</Button>
			</div>
		);
	}
}

QuestionnaireRegistration.propTypes = {
	handleSuccessfulPage: PropTypes.func,
	handleSubmittedData: PropTypes.func,
	handlePageError: PropTypes.func,
	questionnaireId: PropTypes.string
};

export default QuestionnaireRegistration;
