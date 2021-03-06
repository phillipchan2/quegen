import React, { Component } from 'react'
import PropTypes from 'prop-types'

class QuestionnaireResult extends Component {
	render() {
		return (
			<div className="questionnaire-result">
				<div className="result-text">
					<p>{this.props.resultCategory.resultDescription}</p>
				</div>
				<div className="results-closing">
					If chosen, 30 days prior to the gathering, your golden
					invitation will arrive both by text message and post
				</div>
				<div
					className="image-background"
					style={{
						backgroundImage: `url(${
							this.props.resultCategory.imageUrl
						})`,
					}}
				/>
			</div>
		)
	}
}

QuestionnaireResult.propTypes = {
	imageUrl: PropTypes.string,
	resultDescription: PropTypes.string,
}

export default QuestionnaireResult
