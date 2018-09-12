// libraries
import React, { Component } from 'react';

// components
import { Button, Header, Form } from 'semantic-ui-react';

class Login extends Component {
	render() {
		return (
			<div className="login-page">
				<header>
					<Header as="h1">Login</Header>
				</header>
				<Form>
					<Form.Field>
						<label>Email</label>
						<input name="email" placeholder="Email" />
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<input
							type="password"
							name="password"
							placeholder="Enter Your Password"
						/>
					</Form.Field>
					<Button type="submit">Login</Button> Don't have an account?
					Register for one
				</Form>
			</div>
		);
	}
}

export default Login;
