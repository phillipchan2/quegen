import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ViewQuestionMultipleChoice extends Component {
	constructor(props) {
		super(props)

		this.state = {
			_id: this.props.question._id,
			value: null,
			type: 'multipleChoice',
			title: this.props.question.title,
		}
	}

	handleClick(answer) {
		this.setState(
			{
				value: answer,
			},
			() => {
				this.props.questionAnswered(this.state)
			}
		)
	}
	render() {
		const { value } = this.state

		return (
			<div className="view-question-weighted">
				<label>{this.props.question.title}</label>
				{this.props.question.choices.map((choice, index) => {
					return (
						<a
							className={`${
								this.state.value === choice.name
									? 'selected'
									: ''
							} answer`}
							onClick={this.handleClick.bind(this, choice.name)}
						>
							{choice.name}
						</a>
					)
				})}
			</div>
		)
	}
}

ViewQuestionMultipleChoice.propTypes = {
	question: PropTypes.object,
}

export default ViewQuestionMultipleChoice
