import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Message, Modal, Icon, Header } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

// components
import ViewQuestionWeighted from '../../molecules/ViewQuestionWeighted/ViewQuestionWeighted';
import ViewQuestionText from '../../molecules/ViewQuestionText/ViewQuestionText';
import ViewQuestionMultipleChoice from '../../molecules/ViewQuestionMultipleChoice/ViewQuestionMultipleChoice';

class QuestionnaireQuestions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			answers: []
		};
	}

	UNSAFE_componentWillReceiveProps() {
		var answers = this.props.questions.map(question => {
			return {
				_id: question._id,
				answered: false,
				value: undefined,
				type: question.type
			};
		});

		this.setState({ answers: answers });
	}

	areQuestionsAnswered() {
		let unansweredQuestions = [];

		this.state.answers.forEach((answer, index) => {
			if (answer.answered !== true) {
				unansweredQuestions.push(index);
			}
		});

		if (unansweredQuestions.length > 0) {
			return unansweredQuestions;
		} else {
			return true;
		}
	}

	questionAnswered(responseFromQuestion) {
		var answers = this.state.answers;
		console.log(responseFromQuestion);

		answers.find((answer, index) => {
			if (answer._id === responseFromQuestion._id) {
				answers[index].answered = true;
				answers[index].value = responseFromQuestion.value;
			}
		});

		this.setState({ answers: answers });
	}

	handleSubmit() {
		var resultsOfCheckingAnswers = this.areQuestionsAnswered();

		if (resultsOfCheckingAnswers === true) {
			this.props.handleSubmittedData({ answers: this.state.answers });
			// axios
			// 	.post(
			// 		`/api/quizzes/${this.props.questionnaireId}/submit`,
			// 		Object.assign(this.state.response, {
			// 			submittedOn: moment()
			// 		})
			// 	)
			// 	.then(res => {
			// 		if (res.data.success) {
			// 			let category = res.data.data;

			// 			this.setState({
			// 				submitSuccess: true,
			// 				resultCategory: category,
			// 				modalOpen: true
			// 			});
			// 		} else {
			// 			this.setState({
			// 				submitSuccess: false,
			// 				errorMessage: 'Error Submitting'
			// 			});
			// 		}
			// 	});
		} else {
			this.setState({
				errorMessage: `You have questions ${resultsOfCheckingAnswers.map(
					questionNumber => {
						return `${questionNumber + 1} `;
					}
				)} unanswered`
			});
		}
	}

	render() {
		return (
			<div className="questionnaire">
				{this.state.errorMessage && (
					<Message error>{this.state.errorMessage}</Message>
				)}

				{this.props.questions.map((question, index) => {
					switch (question.type) {
						case 'weighted':
							return (
								<ViewQuestionWeighted
									questionAnswered={this.questionAnswered.bind(
										this
									)}
									index={index}
									question={question}
								/>
							);
						case 'text':
							return (
								<ViewQuestionText
									questionAnswered={this.questionAnswered.bind(
										this
									)}
									index={index}
									question={question}
								/>
							);
						case 'multipleChoice':
							return (
								<ViewQuestionMultipleChoice
									questionAnswered={this.questionAnswered.bind(
										this
									)}
									index={index}
									question={question}
								/>
							);
						default:
							return 'Error - Wrong question type';
					}
				})}

				<Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
			</div>
		);
	}
}

QuestionnaireQuestions.propTypes = {
	handleSuccessfulPage: PropTypes.func,
	handleSubmittedData: PropTypes.func,
	questionnaireId: PropTypes.string
};

export default QuestionnaireQuestions;
