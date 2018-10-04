import React, { Component } from 'react';

import { Form, Radio } from 'semantic-ui-react';

class ViewQuestionWeighted extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: this.props.question._id,
			value: null,
			type: 'weighted'
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
				<Form.Field
					control={Radio}
					label="Yes"
					value={true}
					checked={value === true}
					onChange={this.handleChange.bind(this)}
				/>
				<Form.Field
					control={Radio}
					label="No"
					value={false}
					checked={value === false}
					onChange={this.handleChange.bind(this)}
				/>
			</Form.Group>
		);
	}
}

export default ViewQuestionWeighted;
