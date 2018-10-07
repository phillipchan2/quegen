import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

// services
import AuthStore from './stores/AuthStore';
import CategorySetStore from './stores/CategorySetStore';
import QuestionnaireStore from './stores/QuestionnaireStore';
import AppMessagingStore from './stores/AppMessagingStore';

// service components
import ProtectedRoute from './components/services/ProtectedRoute';
import Init from './components/services/Init';

// pages
import Admin from './components/pages/Admin/Admin';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Questionnaire from './components/pages/Questionnaire/Questionnaire';

// components
import 'react-table/react-table.css';

class App extends Component {
	render() {
		return (
			<Provider
				AuthStore={new AuthStore()}
				CategorySetStore={new CategorySetStore()}
				QuestionnaireStore={new QuestionnaireStore()}
				AppMessagingStore={new AppMessagingStore()}
			>
				<Router>
					<div className="app">
						<Init />
						<div className="router">
							<Route exact path="/" component={Home} />

							<ProtectedRoute path="/admin" component={Admin} />

							<Route
								path="/admin/questionnaire/view/:id"
								component={Questionnaire}
							/>

							<Route
								path="/questionnaires/:id"
								component={Questionnaire}
							/>

							<Route path="/admin/login" component={Login} />
							<Route
								path="/admin/register"
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
