import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

// services
import AuthStore from './stores/AuthStore';
import CategorySetStore from './stores/CategorySetStore';
import QuestionnaireStore from './stores/QuestionnaireStore';

// service components
import ProtectedRoute from './components/services/ProtectedRoute';
import Init from './components/services/Init';

// pages
import Admin from './components/pages/Admin/Admin';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import CategorySets from './components/pages/CategorySets/CategorySets';
import Questionnaires from './components/pages/Questionnaires/Questionnaires';
import Questionnaire from './components/pages/Questionnaire/Questionnaire';
import AddEditCategorySet from './components/pages/AddEditCategorySet/AddEditCategorySet';
import AddEditQuestionnaire from './components/pages/AddEditQuestionnaire/AddEditQuestionnaire';

class App extends Component {
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
						<div className="router">
							<Route path="/" component={Home} />

							<ProtectedRoute path="/admin" component={Admin} />

							<ProtectedRoute
								path="/admin/categorysets"
								component={CategorySets}
							/>

							<ProtectedRoute
								path="/admin/categoryset/:id"
								component={AddEditCategorySet}
							/>

							<ProtectedRoute
								path="/admin/questionnaires/"
								component={Questionnaires}
							/>

							<ProtectedRoute
								path="/admin/questionnaire/:id"
								component={AddEditQuestionnaire}
							/>

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
