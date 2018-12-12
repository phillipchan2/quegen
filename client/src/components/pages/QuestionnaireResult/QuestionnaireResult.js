import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionnaireResult extends Component {
	render() {
		return (
			<div>
				<h1>You are a {this.props.resultCategory.name}</h1>
				<p>{this.props.resultCategory.resultDescription}</p>
				{this.props.resultCategory.imageUrl && (
					<img
						style={{ width: 300, height: 'auto' }}
						src={this.props.resultCategory.imageUrl}
						alt={this.props.resultCategory.name}
					/>
				)}
			</div>
		);
	}
}

QuestionnaireResult.propTypes = {};

export default QuestionnaireResult;
