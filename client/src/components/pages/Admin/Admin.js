import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// service components
import ProtectedRoute from '../../services/ProtectedRoute';

// components
import Navigation from '../../organisms/Navigation/Navigation';
import AppMessage from '../../molecules/AppMessage/AppMessage';

// pages
import CategorySets from '../../pages/CategorySets/CategorySets';
import AddEditCategorySet from '../../pages/AddEditCategorySet/AddEditCategorySet';
import Questionnaires from '../../pages/Questionnaires/Questionnaires';
import AddEditQuestionnaire from '../../pages/AddEditQuestionnaire/AddEditQuestionnaire';
import QuestionnaireResponses from '../../pages/QuestionnaireResponses/QuestionnaireResponses';

@inject('AppMessagingStore')
@observer
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
						path={`${this.props.match.url}/questionnaires/`}
						component={Questionnaires}
					/>
					<ProtectedRoute
						exact
						path={`${this.props.match.url}/questionnaire/:id`}
						component={AddEditQuestionnaire}
					/>
					<ProtectedRoute
						path={`${
							this.props.match.url
						}/questionnaire/:id/responses/`}
						component={QuestionnaireResponses}
					/>
				</div>

				{this.props.AppMessagingStore.message ? (
					<AppMessage
						message={this.props.AppMessagingStore.message}
					/>
				) : (
					''
				)}
			</div>
		);
	}
}

export default Admin;
