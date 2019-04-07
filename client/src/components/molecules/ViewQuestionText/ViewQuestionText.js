import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';

class ViewQuestionText extends Component {
	constructor(props) {
		super(props);

		this.contentEditable = React.createRef();

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
					<ContentEditable
						innerRef={this.contentEditable}
						html={this.state.value} // innerHTML of the editable div
						onChange={this.handleChange.bind(this)} // handle innerHTML change
						tagName="article" // Use a custom HTML tag (uses a div by default)
						placeholder={this.props.question.title}
						style={{ textAlign: 'center' }}
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
