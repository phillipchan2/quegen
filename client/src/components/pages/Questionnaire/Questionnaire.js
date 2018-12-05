import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

// components
import { Button, Form, Message, Modal, Icon, Header } from 'semantic-ui-react';

// pages
import QuestionnaireLogin from '../QuestionnaireLogin/QuestionnaireLogin';
import QuestionnaireRegistration from '../QuestionnaireRegistration/QuestionnaireRegistration';
import QuestionnaireQuestions from '../QuestionnaireQuestions/QuestionnaireQuestions';

class Questionnaire extends Component {
	constructor(props) {
		super(props);

		this.handleSubmittedData = this.handleSubmittedData.bind(this);

		this.state = {
			// holds all the submission info
			consolidatedSubmissionData: {},
			errorMessage: '',
			modalOpen: false,
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

	handleSubmittedData(data) {
		var newSubmission = Object.assign(
			this.state.consolidatedSubmissionData,
			data
		);

		this.setState({ consolidatedSubmissionData: newSubmission });
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
							{...page.props}
							questionnaireId={this.props.match.params.id}
						/>
						<Modal
							open={this.state.modalOpen}
							onClose={this.handleClose}
							basic
							size="small"
						>
							<Header
								icon="browser"
								content={`You are a ${
									this.state.resultCategory.name
								}!`}
							/>
							<Modal.Content>
								<p>
									{
										this.state.resultCategory
											.resultDescription
									}
								</p>
								<p>
									You'll be getting an email later with more
									information
								</p>
							</Modal.Content>
							<Modal.Actions>
								<Button
									color="green"
									onClick={this.handleClose}
									inverted
								>
									<Icon name="checkmark" /> Got it
								</Button>
							</Modal.Actions>
						</Modal>
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
