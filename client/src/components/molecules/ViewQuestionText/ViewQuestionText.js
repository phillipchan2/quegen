import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewQuestionText extends Component {
	constructor(props) {
		super(props);

		this.state = {
			_id: this.props.question._id,
			value: null,
			type: 'text',
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e) {
		var value = e.target.value;

		this.setState({
			value,
		});
	}

	handleClick(e) {
		this.props.questionAnswered(this.state);
	}
	render() {
		return (
			<div className="question-text-container">
				<div className="input-group">
					<textarea
						style={{
							background: '#000',
							border: 0,
							color: '#FFF',
							'font-family': 'Ravensara',
							padding: '1em',
						}}
						onChange={e => this.handleChange(e)}
						placeholder={this.props.question.title}
					/>

					{this.state.value && (
						<button
							className="question-text-next"
							onClick={this.handleClick.bind(this)}
						>
							Next
						</button>
					)}
				</div>
			</div>
		);
	}
}

ViewQuestionText.propTypes = {
	questionAnswered: PropTypes.func,
	question: PropTypes.string,
};

export default ViewQuestionText;
