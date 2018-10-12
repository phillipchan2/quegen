import React, { Component } from 'react';
import axios from 'axios';

// components
import { Tab } from 'semantic-ui-react';
import ViewResponsesWeighted from '../../organisms/ViewResponsesWeighted/ViewResponsesWeighted';
import ViewResponsesText from '../../organisms/ViewResponsesText/ViewResponsesText';
import ViewResponsesMultipleChoice from '../../organisms/ViewResponsesMultipleChoice/ViewResponsesMultipleChoice';

class QuestionnaireResponses extends Component {
	constructor(props) {
		super(props);

		this.state = {
			responses: [],
			responsesWeighted: [],
			responsesMultipleChoice: [],
			responsesText: []
		};
	}

	filterResponses(responses) {
		let responsesWeighted = [];
		let responsesMultipleChoice = [];
		let responsesText = [];
		let newState = this.state;

		responses.forEach(submission => {
			// weighted responses
			responsesWeighted.push(submission);

			submission.responses.forEach(response => {
				let submissionInfo = submission;

				delete submissionInfo.responses;

				// text
				if (response.type === 'text') {
					responsesText.push(Object.assign(response, submissionInfo));
				}

				if (response.type === 'multipleChoice') {
					responsesMultipleChoice.push(
						Object.assign(response, submissionInfo)
					);
				}
			});
		});

		// text responses

		this.setState({
			responsesWeighted: responsesWeighted,
			responsesMultipleChoice: responsesMultipleChoice,
			responsesText: responsesText
		});
	}

	componentDidMount() {
		const jwtoken = localStorage.getItem('jwtoken');

		if (this.props.match.params.id) {
			axios
				.get(
					`/api/questionnaire/${
						this.props.match.params.id
					}/responses`,
					{
						headers: {
							token: jwtoken
						}
					}
				)
				.then(res => {
					if (res.data.success) {
						let responses = res.data.data;
						this.setState({ responses: responses });
						this.filterResponses(responses);
					}
				});
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
				)
			},
			{
				menuItem: 'Multiple Choice',
				render: () => (
					<Tab.Pane>
						<ViewResponsesMultipleChoice
							responses={this.state.responsesMultipleChoice}
						/>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Text Based',
				render: () => (
					<Tab.Pane>
						<ViewResponsesText
							responses={this.state.responsesText}
						/>
					</Tab.Pane>
				)
			}
		];

		return (
			<div className="questionnaire-responses">
				<Tab panes={panes} />
			</div>
		);
	}
}

export default QuestionnaireResponses;
