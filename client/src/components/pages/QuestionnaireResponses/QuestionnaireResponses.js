import React, { Component } from 'react'
import axios from 'axios'

// components
import { Tab } from 'semantic-ui-react'
import ViewResponsesWeighted from '../../organisms/ViewResponsesWeighted/ViewResponsesWeighted'
import ViewResponsesText from '../../organisms/ViewResponsesText/ViewResponsesText'

class QuestionnaireResponses extends Component {
	constructor(props) {
		super(props)

		this.state = {
			responses: [],
			responsesWeighted: [],
			responsesMultipleChoice: [],
			responsesText: [],
		}
	}

	filterResponses(responses) {
		let responsesWeighted = []
		let responsesMultipleChoice = []
		let responsesText = []
		let newState = this.state
		const jwtoken = localStorage.getItem('jwtoken')

		axios
			.get(`/api/questionnaire/${this.props.match.params.id}`, {
				headers: {
					token: jwtoken,
				},
			})
			.then(res => {
				if (res.data.success) {
					let questions = res.data.data.questions

					responses.forEach(submission => {
						// weighted responses
						responsesWeighted.push(submission)

						submission.responses.forEach(response => {
							let submissionInfo = submission

							var matchingQuestion = questions.filter(
								question => {
									return question._id === response._id
								}
							)

							if (matchingQuestion) {
								response = Object.assign(
									response,
									matchingQuestion[0]
								)
							}

							// text
							if (
								response.type === 'text' ||
								response.type === 'multipleChoice'
							) {
								responsesText.push(
									Object.assign(response, submissionInfo)
								)
							}
						})
					})

					this.forceUpdate()
				}
			})

		// text responses

		this.setState({
			responsesWeighted: responsesWeighted,
			responsesMultipleChoice: responsesMultipleChoice,
			responsesText: responsesText,
		})
	}

	componentWillMount() {
		const jwtoken = localStorage.getItem('jwtoken')

		if (this.props.match.params.id) {
			axios
				.get(
					`/api/questionnaire/${
						this.props.match.params.id
					}/responses`,
					{
						headers: {
							token: jwtoken,
						},
					}
				)
				.then(res => {
					if (res.data.success) {
						let responses = res.data.data
						this.setState({ responses: responses })

						this.filterResponses(responses)
					}
				})
		}
	}

	render() {
		const panes = [
			{
				menuItem: 'Weighted Results',
				render: () => (
					<Tab.Pane>
						<ViewResponsesWeighted
							responses={this.state.responsesWeighted}
						/>
					</Tab.Pane>
				),
			},
			{
				menuItem: 'Multiple Choice and Text Based',
				render: () => (
					<Tab.Pane>
						<ViewResponsesText
							responses={this.state.responsesText}
						/>
					</Tab.Pane>
				),
			},
		]

		return (
			<div className="questionnaire-responses">
				<Tab panes={panes} />
			</div>
		)
	}
}

export default QuestionnaireResponses
