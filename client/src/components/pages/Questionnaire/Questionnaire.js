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
			}
		};
	}

	questionAnswered(responseFromQuestion) {
		let newState = this.state;

		var index = newState.responses.findIndex(response => {
			return response._id === responseFromQuestion._id;
		});

		newState.responses[index] = Object.assign(
			newState.responses[index],
			responseFromQuestion,
			{
				answered: true
			}
		);

		this.setState(newState);
	}

	componentDidMount() {
		axios.get(`/api/quizzes/${this.props.match.params.id}`).then(res => {
			const questionnaire = res.data.data;

			this.setState({
				questionnaire: questionnaire,
				responses: questionnaire.questions.map(question => {
					return {
						_id: question._id,
						answered: false,
						value: undefined,
						type: question.type
					};
				})
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
									questionAnswered={this.questionAnswered.bind(
										this
									)}
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
