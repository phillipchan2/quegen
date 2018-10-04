import React, { Component } from 'react';
import axios from 'axios';

// components
import { Tab } from 'semantic-ui-react';
import ViewResponsesWeighted from '../../molecules/ViewResponsesWeighted/ViewResponsesWeighted';

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

		// weighted tab
		responses.forEach(response => {
			responsesWeighted.push(response);
		});

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
					<ViewResponsesWeighted
						responses={this.state.responsesWeighted}
					/>
				)
			},
			{
				menuItem: 'Multiple Choice',
				render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
			},
			{
				menuItem: 'Text Based',
				render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
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
