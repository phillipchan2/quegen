// libraries
import React, { Component } from 'react';
import axios from 'axios';

// components
import { Button, Checkbox, Form } from 'semantic-ui-react';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginSuccess: false
		};
		this.handleChange.bind(this);
	}

	handleChange(e) {
		var key = e.target.name;
		var value = e.target.value;
		var obj = {};

		obj[key] = value;

		this.setState(obj);
	}

	handleSubmit() {
		console.log(this.state);
		axios.post(`/api/auth/register`, this.state).then(res => {
			if (res.success) {
				this.setState({
					registerSuccess: true
				});

				console.log('success resgister');
			}

			let userId = res.data;

			return userId;
		});
	}
	render() {
		return (
			<div className="register-page">
				<header>Register for account</header>
				<Form>
					<Form.Field>
						<label>Email</label>
						<input
							name="email"
							onChange={this.handleChange.bind(this)}
							placeholder="Email"
						/>
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<input
							type="password"
							name="password"
							onChange={this.handleChange.bind(this)}
							placeholder="Enter Your Password"
						/>
					</Form.Field>
					<Button
						onClick={this.handleSubmit.bind(this)}
						type="submit"
					>
						Login
					</Button>{' '}
					Don't have an account? Register for one
				</Form>
			</div>
		);
	}
}

export default Register;
