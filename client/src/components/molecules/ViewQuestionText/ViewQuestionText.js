import React, { Component } from 'react';

import { Form, Radio } from 'semantic-ui-react';

class ViewQuestionText extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: this.props.question._id,
			value: null,
			type: 'text',
			title: this.props.question.title
		};
	}

	handleChange(e) {
		var value = e.target.value;

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
				<Form.Field onChange={this.handleChange.bind(this)}>
					<input placeholder="" />
				</Form.Field>
			</Form.Group>
		);
	}
}

export default ViewQuestionText;
