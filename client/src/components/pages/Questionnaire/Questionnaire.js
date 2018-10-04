import React, { Component } from 'react';
import axios from 'axios';

// components
import ViewQuestionWeighted from '../../molecules/ViewQuestionWeighted/ViewQuestionWeighted';
import { Button, Form, Message } from 'semantic-ui-react';

class Questionnaire extends Component {
	checkUnansweredQuestions() {
		let unansweredQuestions = [];

		this.state.response.responses.forEach((response, index) => {
			console.log(response);
			if (response.answered !== true) {
				unansweredQuestions.push(index);
			}
		});

		if (unansweredQuestions.length > 0) {
			return unansweredQuestions;
		} else {
			return true;
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			questionnaire: {
				questions: []
			},
			response: {
				email: 'phillipchan1@gmail.com',
				name: 'phil',
				responses: []
			},
			errorMessage: '',
			submitSuccess: false
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit() {
		var resultsOfCheckingAnswers = this.checkUnansweredQuestions();

		console.log(resultsOfCheckingAnswers);

		if (resultsOfCheckingAnswers === true) {
			axios
				.post(
					`/api/quizzes/${this.props.match.params.id}/submit`,
					this.state.response
				)
				.then(res => {
					if (res.data.success) {
						this.setState({
							submitSuccess: true
						});
					} else {
						this.setState({
							submitSuccess: false,
							errorMessage: 'Error Submitting'
						});
					}
					console.log(res);
				});
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

	questionAnswered(responseFromQuestion) {
		let newState = this.state;

		var index = newState.response.responses.findIndex(response => {
			return response._id === responseFromQuestion._id;
		});

		newState.response.responses[index] = Object.assign(
			newState.response.responses[index],
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

			let newState = this.state;

			newState.questionnaire = questionnaire;
			newState.response.responses = questionnaire.questions.map(
				question => {
					return {
						_id: question._id,
						answered: false,
						value: undefined,
						type: question.type
					};
				}
			);

			this.setState(newState);
		});
	}

	render() {
		return (
			<div className="questionnaire">
				{this.state.errorMessage ? (
					<Message error>{this.state.errorMessage}</Message>
				) : (
					''
				)}

				<Form>
					<Form.Field>
						<label>Name</label>
						<input
							placeholder="Name"
							name="name"
							value={this.state.response.name}
							onChange={this.handleChange.bind(this)}
						/>
					</Form.Field>
					<Form.Field>
						<label>Email</label>
						<input
							placeholder="Email"
							name="email"
							value={this.state.response.email}
							onChange={this.handleChange.bind(this)}
						/>
					</Form.Field>
				</Form>
				{this.state.questionnaire.questions.map((question, index) => {
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
						default:
							return 'Error - Wrong question type';
					}
				})}

				<Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
			</div>
		);
	}
}

export default Questionnaire;