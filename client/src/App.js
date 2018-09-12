import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

// pages
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

// components
import Navigation from './components/organisms/Navigation/Navigation';
import { Button } from 'semantic-ui-react';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
			isAuthenticated: false
		};
	}

	componentDidMount() {
		const jwtoken = localStorage.getItem('jwtoken');

		if (jwtoken) {
			axios
				.get(`/auth/verify`, {
					headers: {
						token: jwtoken
					}
				})
				.then(res => {
					console.log(res);

					if (res.data.success) {
						this.setState({
							isAuthenticated: true,
							user: res.data.user
						});
					}
				});
		}

		console.log(jwtoken);
	}

	handleSuccessfulLogin(user, token) {
		this.setState({
			isAuthenticated: true,
			user: user
		});

		localStorage.setItem('jwtoken', token);
		console.log(user, token);
	}

	render() {
		return (
			<Router>
				<div className="app">
					<Navigation />

					<div className="router">
						<Route path="/" exact component={Home} />
						<Route
							path="/login"
							render={props => (
								<Login
									{...props}
									successfulLogin={this.handleSuccessfulLogin.bind(
										this
									)}
								/>
							)}
						/>
						<Route path="/register" exact component={Register} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
