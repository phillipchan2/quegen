// libraries
import React, { Component } from 'react';

// components
import { Button, Checkbox, Form } from 'semantic-ui-react';

class Register extends Component {
	render() {
		return (
			<div className="register-page">
				<header>Login</header>
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

export default Register;
