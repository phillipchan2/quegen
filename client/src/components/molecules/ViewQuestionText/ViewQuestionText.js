import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewQuestionText extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: this.props.question._id,
			value: null,
			type: 'text'
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e) {
		var value = e.target.value;

		this.setState({
			value
		});
	}

	handleClick(e) {
		this.props.questionAnswered(this.state);
	}
	render() {
		const { value } = this.state;
		return (
			<div className="question-text-container">
				<aside className="question-text">
					{this.props.question.title}
				</aside>
				<form>
					<input type="text" onChange={e => this.handleChange(e)} />
					{this.state.value && (
						<a
							className="question-text-next"
							onClick={this.handleClick.bind(this)}
						>
							>
						</a>
					)}
				</form>
			</div>
		);
	}
}

ViewQuestionText.propTypes = {
	questionAnswered: PropTypes.func,
	question: PropTypes.string
};

export default ViewQuestionText;
