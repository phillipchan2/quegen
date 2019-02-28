import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { inject, observer } from 'mobx-react'

// components
import SoundPlayer from '../../molecules/SoundPlayer/SoundPlayer'

// pages
import QuestionnaireLogin from '../QuestionnaireLogin/QuestionnaireLogin'
import QuestionnaireRegistration from '../QuestionnaireRegistration/QuestionnaireRegistration'
import QuestionnairePreview from '../QuestionnairePreview/QuestionnairePreview'
import QuestionnaireQuestions from '../QuestionnaireQuestions/QuestionnaireQuestions'
import QuestionnaireResult from '../QuestionnaireResult/QuestionnaireResult'

// assets
import music from '../../../assets/music.mp3'

@inject('AppMessagingStore')
@observer
class Questionnaire extends Component {
	constructor(props) {
		super(props)

		this.handleSubmitData = this.handleSubmitData.bind(this)
		this.handleConsolidateData = this.handleConsolidateData.bind(this)

		this.state = {
			// holds all the submission info
			consolidatedSubmissionData: {},
			errorMessage: '',
			questionnaire: { questions: [] }, // the data structure which controls the flow of registration page
			questionnaireFlow: [
				{
					success: true,
					name: 'QuestionnaireLogin',
					component: QuestionnaireLogin,
					props: { password: '' },
				},
				{
					success: true,
					name: 'QuestionnaireRegistration',
					component: QuestionnaireRegistration,
				},
				{
					success: false,
					name: 'QuestionnairePreview',
					component: QuestionnairePreview,
					props: {
						description: '',
					},
				},
				{
					success: false,
					name: 'QuestionnaireQuestions',
					component: QuestionnaireQuestions,
					props: { questions: [], questionnaireId: '' },
				},
				{
					success: false,
					name: 'QuestionnaireResult',
					component: QuestionnaireResult,
					props: { resultCategory: {} },
				},
			],
			resultCategory: {},
			submitSuccess: false,
		}
	}

	handleClose = () => this.setState({ modalOpen: false })

	handleOpen = () => this.setState({ modalOpen: true })

	// seed data
	UNSAFE_componentWillMount() {
		axios.get(`/api/quizzes/${this.props.match.params.id}`).then(res => {
			const questionnaire = res.data.data

			var questionnaireFlow = this.state.questionnaireFlow

			// seed data for props from current Questionnaire
			questionnaireFlow.find((page, index) => {
				// populate password
				if (page.name === 'QuestionnaireLogin') {
					// if there is a password
					if (questionnaire.password) {
						questionnaireFlow[index].props.password =
							questionnaire.password
					} else {
						questionnaireFlow[index].success = true
					}
				}

				// populate description
				else if (page.name === 'QuestionnairePreview') {
					questionnaireFlow[index].props.description =
						questionnaire.description
				}

				// populate questions
				else if (page.name === 'QuestionnaireQuestions') {
					questionnaireFlow[index].props.questions =
						questionnaire.questions
				}
			})

			this.setState({
				questionnaireFlow: questionnaireFlow,
				questionnaire: questionnaire,
			})
		})
	}

	handlePageError(err) {
		alert(err)
	}

	handleConsolidateData(data) {
		var consolidatedSubmissionData = this.state.consolidatedSubmissionData

		this.setState({
			consolidatedSubmissionData: Object.assign(
				consolidatedSubmissionData,
				data
			),
		})
	}

	handleSubmitData(data) {
		const jwtoken = localStorage.getItem('jwtoken')

		var newSubmission = Object.assign(
			this.state.consolidatedSubmissionData,
			data,
			{
				submittedOn: moment(),
			}
		)

		this.setState({ consolidatedSubmissionData: newSubmission })

		axios
			.post(
				`/api/quizzes/${this.props.match.params.id}/submit`,
				newSubmission,
				{
					headers: {
						token: jwtoken,
					},
				}
			)
			.then(res => {
				if (res.data.success) {
					let category = res.data.data

					this.setState({
						submitSuccess: true,
						resultCategory: category,
					})

					let questionnaireFlow = this.state.questionnaireFlow

					questionnaireFlow.find((page, index) => {
						if (page.name === 'QuestionnaireResult') {
							questionnaireFlow[index].resultCategory = category
						} else if (page.name === 'QuestionnaireQuestions') {
							questionnaireFlow[index].success = true

							this.setState({
								questionnaireFlow: questionnaireFlow,
							})
						}
					})
				} else {
					this.setState({
						submitSuccess: false,
						errorMessage: 'Error Submitting',
					})

					this.handlePageError(
						`Error Submitting Questionnaire: ${String(
							res.data.message
						)}`
					)
				}
			})
	}

	handleSuccessfulPage(index) {
		var currentWorkflow = this.state.questionnaireFlow

		currentWorkflow[index]['success'] = true

		this.setState({
			questionnaireFlow: currentWorkflow,
		})
	}

	componentDidMount() {
		axios.get(`/api/quizzes/${this.props.match.params.id}`).then(res => {
			const questionnaire = res.data.data

			this.setState({
				questionnaire: questionnaire,
			})
		})
	}

	render() {
		var currentpageindex = 0

		var page = this.state.questionnaireFlow.find((page, index) => {
			currentpageindex = index

			return page.success === false
		})

		var ComponentToRender = page.component

		return (
			<div>
				{this.state.questionnaire._id ? (
					<div className="questionnaire">
						<ComponentToRender
							handleSuccessfulPage={this.handleSuccessfulPage.bind(
								this,
								currentpageindex
							)}
							handleSubmitData={this.handleSubmitData}
							handleConsolidateData={this.handleConsolidateData}
							handlePageError={this.handlePageError}
							{...page.props}
							questionnaireId={this.props.match.params.id}
							resultCategory={this.state.resultCategory}
						/>
						{/* <SoundPlayer src={music} /> */}
					</div>
				) : (
					'Questionnnaire not found'
				)}
			</div>
			//
		)
	}
}

export default Questionnaire
