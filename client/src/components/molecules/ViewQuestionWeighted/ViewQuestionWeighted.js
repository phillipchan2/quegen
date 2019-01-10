import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewQuestionWeighted extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: this.props.question._id,
			value: null,
			type: 'weighted'
		};
	}

	handleClick(answer) {
		this.setState(
			{
				value: answer
			},
			() => {
				this.props.questionAnswered(this.state);
			}
		);
	}

	render() {
		const { value } = this.state;
		return (
			<div className="view-question-weighted">
				<label>{this.props.question.title}</label>
				<a
					className={`${
						this.state.value === true ? 'selected' : ''
					} answer`}
					onClick={this.handleClick.bind(this, true)}
				>
					Yes
				</a>
				<a
					className={`${
						this.state.value === false ? 'selected' : ''
					} answer`}
					onClick={this.handleClick.bind(this, false)}
				>
					No
				</a>
			</div>
		);
	}
}

ViewQuestionWeighted.propTypes = {
	questionAnswered: PropTypes.func,
	question: PropTypes.string
};

export default ViewQuestionWeighted;
