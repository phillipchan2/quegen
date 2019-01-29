import React, { Component } from 'react'
import PropTypes from 'prop-types'

class QuestionnaireResult extends Component {
	render() {
		return (
			<div
				style={{
					backgroundImage: this.props.resultCategory.imageUrl,
					backgroundSize: 'cover',
				}}
			>
				<h1>You are a {this.props.resultCategory.name}</h1>
				<p>{this.props.resultCategory.resultDescription}</p>
			</div>
		)
	}
}

QuestionnaireResult.propTypes = {
	imageUrl: PropTypes.string,
	resultDescription: PropTypes.string,
}

export default QuestionnaireResult
