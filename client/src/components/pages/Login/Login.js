// libraries
import React, { Component } from 'react';
import axios from 'axios';

// components
import { Button, Header, Form, Message } from 'semantic-ui-react';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginSuccess: false,
			errorMessage: ''
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
		axios.post(`/api/auth/login`, this.state).then(res => {
			if (res.data.success) {
				this.setState({
					loginSuccess: true
				});

				this.props.successfulLogin(res.data.user, res.data.token);
			} else {
				this.setState({
					loginSuccess: false,
					errorMessage: res.data.message
				});
			}
		});
	}

	render() {
		return (
			<div className="login-page">
				<header style={{ marginBottom: '1rem' }}>
					<Header as="h1">Login</Header>
					{this.state.errorMessage ? (
						<Message warning>
							<p>{this.state.errorMessage}</p>
						</Message>
					) : (
						''
					)}
				</header>
				<Form>
					<Form.Field>
						<label>Email</label>
						<input
							onChange={this.handleChange.bind(this)}
							name="email"
							placeholder="Email"
						/>
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<input
							type="password"
							onChange={this.handleChange.bind(this)}
							name="password"
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

export default Login;