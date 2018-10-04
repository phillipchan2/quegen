import React, { Component } from 'react';

// service components
import ProtectedRoute from '../../services/ProtectedRoute';

// components
import Navigation from '../../organisms/Navigation/Navigation';

// pages
import CategorySets from '../../pages/CategorySets/CategorySets';
import AddEditCategorySet from '../../pages/AddEditCategorySet/AddEditCategorySet';
import Questionnaires from '../../pages/Questionnaires/Questionnaires';
import AddEditQuestionnaire from '../../pages/AddEditQuestionnaire/AddEditQuestionnaire';

class Admin extends Component {
	render() {
		return (
			<div className="admin-page">
				<div className="admin-container">
					<Navigation />
					<ProtectedRoute
						path={`${this.props.match.url}/categorySets`}
						component={CategorySets}
						exact
					/>
					<ProtectedRoute
						path={`${this.props.match.url}/categoryset/:id`}
						component={AddEditCategorySet}
					/>
					<ProtectedRoute
						path={`${this.props.match.url}/categoryset/:id`}
						component={AddEditCategorySet}
					/>
					<ProtectedRoute
						path={`${this.props.match.url}/questionnaires/`}
						component={Questionnaires}
					/>
					<ProtectedRoute
						path={`${this.props.match.url}/questionnaire/:id`}
						component={AddEditQuestionnaire}
					/>
				</div>
			</div>
		);
	}
}

export default Admin;
