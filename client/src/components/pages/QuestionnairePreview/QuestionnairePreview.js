import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class QuestionnairePreview extends Component {
	render() {
		return (
			<div>
				{this.props.description
					? this.props.description
					: 'Begin the questionnaire'}
				<Button onClick={this.props.handleSuccessfulPage}>
					Continue
				</Button>
			</div>
		);
	}
}

QuestionnairePreview.propTypes = {
	description: PropTypes.string
};

export default QuestionnairePreview;
