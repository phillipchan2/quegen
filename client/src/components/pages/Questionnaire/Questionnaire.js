import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

// components
import { Button, Form, Message, Icon, Header } from 'semantic-ui-react';

// pages
import QuestionnaireLogin from '../QuestionnaireLogin/QuestionnaireLogin';
import QuestionnaireRegistration from '../QuestionnaireRegistration/QuestionnaireRegistration';
import QuestionnaireQuestions from '../QuestionnaireQuestions/QuestionnaireQuestions';
import QuestionnaireResult from '../QuestionnaireResult/QuestionnaireResult';

class Questionnaire extends Component {
	constructor(props) {
		super(props);

		this.handleSubmittedData = this.handleSubmittedData.bind(this);

		this.state = {
			// holds all the submission info
			consolidatedSubmissionData: {},
			errorMessage: '',
			questionnaire: {
				questions: []
			},
			// the data structure which controls the flow of registration page
			questionnaireFlow: [
				{
					success: false,
					name: 'QuestionnaireLogin',
					component: QuestionnaireLogin,
					props: {
						password: 'q'
					}
				},
				{
					success: false,
					name: 'QuestionnaireRegistration',
					component: QuestionnaireRegistration
				},
				{
					success: false,
					name: 'QuestionnaireQuestions',
					component: QuestionnaireQuestions,
					props: {
						questions: [],
						questionnaireId: ''
					}
				},
				{
					success: false,
					name: 'QuestionnaireResult',
					component: QuestionnaireResult,
					props: {
						resultCategory: {}
					}
				}
			],
			resultCategory: {},
			submitSuccess: false
		};
	}

	handleClose = () => this.setState({ modalOpen: false });

	handleOpen = () => this.setState({ modalOpen: true });

	UNSAFE_componentWillMount() {
		axios.get(`/api/quizzes/${this.props.match.params.id}`).then(res => {
			const questionnaire = res.data.data;

			var questionnaireFlow = this.state.questionnaireFlow;

			questionnaireFlow.find((page, index) => {
				if (page.name === 'QuestionnaireQuestions') {
					// give it questions
					questionnaireFlow[index].props.questions =
						questionnaire.questions;
				}
			});

			this.setState({
				questionnaireFlow: questionnaireFlow,
				questionnaire: questionnaire
			});
		});
	}

	handlePageError(err) {
		alert(err);
	}

	handleSubmittedData(data) {
		const jwtoken = localStorage.getItem('jwtoken');

		var newSubmission = Object.assign(
			this.state.consolidatedSubmissionData,
			data,
			{
				submittedOn: moment()
			}
		);

		this.setState({ consolidatedSubmissionData: newSubmission });

		console.log(newSubmission);

		axios
			.post(
				`/api/quizzes/${this.props.match.params.id}/submit`,
				newSubmission,
				{
					headers: {
						token: jwtoken
					}
				}
			)
			.then(res => {
				if (res.data.success) {
					let category = res.data.data;

					this.setState({
						submitSuccess: true,
						resultCategory: category
					});

					let quesitonnaireFlow = this.state.questionnaireFlow;

					quesitonnaireFlow.find((page, index) => {
						if (page.name === 'QuestionnaireQuestions') {
							quesitonnaireFlow[index].success = true;

							this.setState({
								quesitonnaireFlow: quesitonnaireFlow
							});
						}
					});
				} else {
					this.setState({
						submitSuccess: false,
						errorMessage: 'Error Submitting'
					});
				}
			});
	}

	handleSuccessfulPage(index) {
		var currentWorkflow = this.state.questionnaireFlow;

		currentWorkflow[index]['success'] = true;

		this.setState({
			questionnaireFlow: currentWorkflow
		});
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
		var currentpageindex = 0;

		var page = this.state.questionnaireFlow.find((page, index) => {
			currentpageindex = index;

			return page.success === false;
		});

		var ComponentToRender = page.component;

		return (
			<div>
				{this.state.questionnaire._id ? (
					<div className="questionnaire">
						<ComponentToRender
							handleSuccessfulPage={this.handleSuccessfulPage.bind(
								this,
								currentpageindex
							)}
							handleSubmittedData={this.handleSubmittedData}
							handlePageError={this.handlePageError}
							{...page.props}
							questionnaireId={this.props.match.params.id}
						/>
					</div>
				) : (
					'Questionnnaire not found'
				)}
			</div>
			//
		);
	}
}

export default Questionnaire;
