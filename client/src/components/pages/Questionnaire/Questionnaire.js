import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import { Button, Form, Message, Modal, Icon, Header } from 'semantic-ui-react';
import ViewQuestionWeighted from '../../molecules/ViewQuestionWeighted/ViewQuestionWeighted';
import ViewQuestionText from '../../molecules/ViewQuestionText/ViewQuestionText';
import ViewQuestionMultipleChoice from '../../molecules/ViewQuestionMultipleChoice/ViewQuestionMultipleChoice';

// pages
import QuestionnaireLogin from '../QuestionnaireLogin/QuestionnaireLogin';
import QuestionnaireRegistration from '../QuestionnaireRegistration/QuestionnaireRegistration';

class Questionnaire extends Component {
	checkUnansweredQuestions() {
		let unansweredQuestions = [];

		this.state.response.responses.forEach((response, index) => {
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

	// the data structure which controls the flow of registration page

	constructor(props) {
		super(props);

		this.handleSubmittedData = this.handleSubmittedData.bind(this);

		this.state = {
			// holds all the submission info
			submission: {},
			modalOpen: false,
			questionnaire: {
				questions: []
			},
			response: {
				email: 'phillipchan1@gmail.com',
				name: '',
				phone: undefined,
				responses: []
			},
			errorMessage: '',
			resultCategory: {},
			submitSuccess: false,
			questionnaireFlow: [
				{
					success: false,
					component: QuestionnaireLogin,
					props: {
						password: 'quegen'
					}
				},
				{
					success: false,
					component: QuestionnaireRegistration
				}
			]
		};
	}

	handleChange(e) {
		let newState = this.state;

		this.setState({
			[e.target.name]: e.target.value
		});

		newState.response[e.target.name] = e.target.value;
		this.setState(newState);
	}

	handleSubmit() {
		var resultsOfCheckingAnswers = this.checkUnansweredQuestions();

		if (resultsOfCheckingAnswers === true) {
			axios
				.post(
					`/api/quizzes/${this.props.match.params.id}/submit`,
					Object.assign(this.state.response, {
						submittedOn: moment()
					})
				)
				.then(res => {
					if (res.data.success) {
						let category = res.data.data;

						this.setState({
							submitSuccess: true,
							resultCategory: category,
							modalOpen: true
						});
					} else {
						this.setState({
							submitSuccess: false,
							errorMessage: 'Error Submitting'
						});
					}
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

	handleSubmittedData(data) {
		var newSubmission = Object.assign(this.state.submission, data);

		this.setState({ submission: newSubmission });
	}

	handleSuccessfulPage(index) {
		var currentWorkflow = this.state.questionnaireFlow;

		currentWorkflow[index]['success'] = true;

		this.setState({
			questionnaireFlow: currentWorkflow
		});
	}

	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });

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
		var currentStopindex = 0;

		var stop = this.state.questionnaireFlow.find((stop, index) => {
			currentStopindex = index;

			return stop.success === false;
		});

		var ComponentToRender = stop.component;

		console.log('stop', stop);
		return (
			<div>
				hi
				<ComponentToRender
					handleSuccess={this.handleSuccessfulPage.bind(
						this,
						currentStopindex
					)}
					handleSubmittedData={this.handleSubmittedData}
					currentStopindex={currentStopindex}
					{...stop.props}
				/>
			</div>
			// <div className="questionnaire">
			// 	{this.state.errorMessage && (
			// 		<Message error>{this.state.errorMessage}</Message>
			// 	)}

			// 	<Modal
			// 		trigger={
			// 			<Button onClick={this.handleOpen}>Show Modal</Button>
			// 		}
			// 		open={this.state.modalOpen}
			// 		onClose={this.handleClose}
			// 		basic
			// 		size="small"
			// 	>
			// 		<Header
			// 			icon="browser"
			// 			content={`You are a ${this.state.resultCategory.name}!`}
			// 		/>
			// 		<Modal.Content>
			// 			<p>{this.state.resultCategory.resultDescription}</p>
			// 			<p>
			// 				You'll be getting an email later with more
			// 				information
			// 			</p>
			// 		</Modal.Content>
			// 		<Modal.Actions>
			// 			<Button
			// 				color="green"
			// 				onClick={this.handleClose}
			// 				inverted
			// 			>
			// 				<Icon name="checkmark" /> Got it
			// 			</Button>
			// 		</Modal.Actions>
			// 	</Modal>

			// 	<Form>
			// 		<Form.Field>
			// 			<label>Name</label>
			// 			<input
			// 				placeholder="Name"
			// 				name="name"
			// 				value={this.state.response.name}
			// 				onChange={this.handleChange.bind(this)}
			// 			/>
			// 		</Form.Field>
			// 		<Form.Field>
			// 			<label>Email</label>
			// 			<input
			// 				placeholder="Email"
			// 				name="email"
			// 				value={this.state.response.email}
			// 				onChange={this.handleChange.bind(this)}
			// 			/>
			// 		</Form.Field>
			// 		<Form.Field>
			// 			<label>Phone</label>
			// 			<input
			// 				placeholder="Phone Number"
			// 				name="phone"
			// 				value={this.state.response.phone}
			// 				onChange={this.handleChange.bind(this)}
			// 			/>
			// 		</Form.Field>
			// 	</Form>
			// 	{this.state.questionnaire.questions.map((question, index) => {
			// 		switch (question.type) {
			// 			case 'weighted':
			// 				return (
			// 					<ViewQuestionWeighted
			// 						questionAnswered={this.questionAnswered.bind(
			// 							this
			// 						)}
			// 						index={index}
			// 						question={question}
			// 					/>
			// 				);
			// 			case 'text':
			// 				return (
			// 					<ViewQuestionText
			// 						questionAnswered={this.questionAnswered.bind(
			// 							this
			// 						)}
			// 						index={index}
			// 						question={question}
			// 					/>
			// 				);
			// 			case 'multipleChoice':
			// 				return (
			// 					<ViewQuestionMultipleChoice
			// 						questionAnswered={this.questionAnswered.bind(
			// 							this
			// 						)}
			// 						index={index}
			// 						question={question}
			// 					/>
			// 				);
			// 			default:
			// 				return 'Error - Wrong question type';
			// 		}
			// 	})}

			// 	<Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
			// </div>
		);
	}
}

export default Questionnaire;
