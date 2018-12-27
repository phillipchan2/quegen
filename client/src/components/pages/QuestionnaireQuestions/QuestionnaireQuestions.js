import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Message, } from 'semantic-ui-react';

// components
import ViewQuestionWeighted from '../../molecules/ViewQuestionWeighted/ViewQuestionWeighted';
import ViewQuestionText from '../../molecules/ViewQuestionText/ViewQuestionText';
import ViewQuestionMultipleChoice from '../../molecules/ViewQuestionMultipleChoice/ViewQuestionMultipleChoice';

class QuestionnaireQuestions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			responses: []
		};
	}

	UNSAFE_componentWillMount() {
		var responses = this.props.questions.map(question => {
			return {
				_id: question._id,
				answered: false,
				value: undefined,
				type: question.type
			};
		});

		this.setState({ responses: responses });
	}

	areQuestionsAnswered() {
		let unansweredQuestions = [];

		this.state.responses.forEach((answer, index) => {
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
		var responses = this.state.responses;

		responses.find((answer, index) => {
			if (answer._id === responseFromQuestion._id) {
				responses[index].answered = true;
				responses[index].value = responseFromQuestion.value;
			}
		});

		this.setState({ responses: responses });
	}

	handleSubmit() {
		var resultsOfCheckingresponses = this.areQuestionsAnswered();

		if (resultsOfCheckingresponses === true) {
			this.props.handleSubmitData({ responses: this.state.responses });
		} else {
			let errorMessage = `You have questions ${resultsOfCheckingresponses.map(
				questionNumber => {
					return `${questionNumber + 1} `;
				}
			)} unanswered`;

			this.props.handlePageError(errorMessage);
		}
	}

	render() {
		return (
			<div className="questionnaire-questions">
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
	handleSubmitData: PropTypes.func,
	handlePageError: PropTypes.func,
	questionnaireId: PropTypes.string
};

export default QuestionnaireQuestions;
