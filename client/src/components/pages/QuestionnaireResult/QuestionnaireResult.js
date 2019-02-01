import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { aOrAn } from '../../../utils/stringUtils'

class QuestionnaireResult extends Component {
	render() {
		return (
			<div className="questionnaire-result">
				<div className="result-text">
					<h1>
						You are {aOrAn(this.props.resultCategory.name)}{' '}
						{this.props.resultCategory.name}
					</h1>
					<p>{this.props.resultCategory.resultDescription}</p>
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
