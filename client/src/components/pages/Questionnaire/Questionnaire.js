import React, { Component } from 'react';
import axios from 'axios';

// components
import moduleName from '../../molecules/ViewQuestionWeighted/ViewQuestionWeighted';
import ViewQuestionWeighted from '../../molecules/ViewQuestionWeighted/ViewQuestionWeighted';

class Questionnaire extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questionnaire: {
				questions: []
			},
			responses: [{}]
		};
	}

	questionAnswered(response) {
		console.log(response);
	}

	componentDidMount() {
		axios.get(`/api/quizzes/${this.props.match.params.id}`).then(res => {
			const questionnaire = res.data.data;

			this.setState({
				questionnaire: questionnaire
			});
		});
	}

	render() {
		return (
			<div className="questionnaire">
				{this.state.questionnaire.questions.map(question => {
					switch (question.type) {
						case 'weighted':
							return (
								<ViewQuestionWeighted
									questionAnswered={this.questionAnswered}
									question={question}
								/>
							);
						default:
							return 'Error - Wrong question type';
					}
				})}
			</div>
		);
	}
}

export default Questionnaire;
