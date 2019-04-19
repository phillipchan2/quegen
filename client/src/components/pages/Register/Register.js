// libraries
import React, { Component } from 'react';
import axios from 'axios';

// components
import { Button, Form, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = { registerSuccess: false };
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
		axios.post(`/api/auth/register`, this.state).then(res => {
			if (res.data.success) {
				this.setState({
					registerSuccess: true,
				});
			} else {
				this.setState({
					errorMessage: res.data.message,
				});
			}

			let userId = res.data;

			return userId;
		});
	}
	render() {
		return (
			<div className="register-page" style={{ padding: '3em' }}>
				{this.state.registerSuccess ? (
					<Message>
						Registration Successful! Please{' '}
						<Link to={'/admin/login'}>Login Now</Link>
					</Message>
				) : (
					''
				)}
				<header style={{ marginBottom: '1rem' }}>
					<Header as="h1">Register</Header>
					{this.state.errorMessage ? (
						<Message warning>
							<p>Error: {this.state.errorMessage}</p>
						</Message>
					) : (
						''
					)}
				</header>
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
						Register
					</Button>{' '}
					Already have an account?{' '}
					<Link to={'/admin/login'}>Login</Link>
				</Form>
			</div>
		);
	}
}

export default Register;
