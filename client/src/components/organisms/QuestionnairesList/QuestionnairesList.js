import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// components
import QuestionnaireCard from '../../molecules/QuestionnaireCard/QuestionnaireCard';

@inject('QuestionnaireStore')
@observer
class QuestionnairesList extends Component {
	componentDidMount() {
		this.props.QuestionnaireStore.getQuestionnaires();
	}

	render() {
		return (
			<div>
				{this.props.QuestionnaireStore.questionnaires.map(
					questionnaire => {
						return (
							<QuestionnaireCard questionnaire={questionnaire} />
						);
					}
				)}
			</div>
		);
	}
}

export default QuestionnairesList;
