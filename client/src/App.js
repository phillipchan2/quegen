import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

// services
import AuthStore from './stores/AuthStore';
import CategorySetStore from './stores/CategorySetStore';
import QuestionnaireStore from './stores/QuestionnaireStore';

// service components
import Init from './components/services/Init';
import ProtectedRoute from './components/services/ProtectedRoute';

// pages
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import CategorySets from './components/pages/CategorySets/CategorySets';
import Questionnaires from './components/pages/Questionnaires/Questionnaires';
import Questionnaire from './components/pages/Questionnaire/Questionnaire';
import AddEditCategorySet from './components/pages/AddEditCategorySet/AddEditCategorySet';
import AddEditQuestionnaire from './components/pages/AddEditQuestionnaire/AddEditQuestionnaire';

// components
import Navigation from './components/organisms/Navigation/Navigation';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
			isAuthenticated: false
		};
	}

	render() {
		return (
			<Provider
				AuthStore={new AuthStore()}
				CategorySetStore={new CategorySetStore()}
				QuestionnaireStore={new QuestionnaireStore()}
			>
				<Router>
					<div className="app">
						<Init />
						<Navigation />

						<div className="router">
							<ProtectedRoute
								isAuthenticated={true}
								path="/"
								component={Home}
							/>

							<ProtectedRoute
								isAuthenticated={true}
								path="/home"
								component={Home}
							/>

							<ProtectedRoute
								isAuthenticated={true}
								path="/categorysets"
								component={CategorySets}
							/>

							<ProtectedRoute
								isAuthenticated={true}
								path="/categoryset/:id"
								component={AddEditCategorySet}
							/>

							<ProtectedRoute
								isAuthenticated={true}
								path="/questionnaires/"
								component={Questionnaires}
							/>

							<ProtectedRoute
								isAuthenticated={true}
								path="/questionnaire/:id"
								component={AddEditQuestionnaire}
							/>

							<Route
								path="/questionnaire/view/:id"
								component={Questionnaire}
							/>

							<Route
								path="/login"
								render={props => <Login {...props} />}
							/>
							<Route
								path="/register"
								exact
								component={Register}
							/>
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
