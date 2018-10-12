import React, { Component } from 'react';

import { Form, Radio } from 'semantic-ui-react';

class ViewQuestionMultipleChoice extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: this.props.question._id,
			value: null,
			type: 'multipleChoice',
			title: this.props.question.title
		};
	}

	handleChange(e, { value }) {
		this.setState(
			{
				value
			},
			() => {
				this.props.questionAnswered(this.state);
			}
		);
	}
	render() {
		const { value } = this.state;
		return (
			<Form.Group inline>
				<label>
					{this.props.index + 1}. {this.props.question.title}
				</label>
				{this.props.question.choices.map(choice => {
					return (
						<Form.Field
							control={Radio}
							label={choice.name}
							value={choice.name}
							checked={value === choice.name}
							onChange={this.handleChange.bind(this)}
						/>
					);
				})}
			</Form.Group>
		);
	}
}

export default ViewQuestionMultipleChoice;
