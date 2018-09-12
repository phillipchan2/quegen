import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// pages
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';

// components
import Navigation from './components/organisms/Navigation/Navigation';
import { Button } from 'semantic-ui-react';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			response: ''
		};
	}

	componentDidMount() {
		this.callApi()
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);

		return body;
	};

	render() {
		return (
			<Router>
				<div className="app">
					<Navigation />

					<div className="router">
						<Route path="/" exact component={Home} />
						<Route path="/login" exact component={Login} />
					</div>

					<p className="App-intro">{this.state.response}</p>
				</div>
			</Router>
		);
	}
}

export default App;
