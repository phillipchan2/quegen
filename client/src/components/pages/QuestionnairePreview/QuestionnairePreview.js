import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class QuestionnairePreview extends Component {
	render() {
		return (
			<div className="questionnaire-preview">
				<aside className="questionnaire-description">
					{this.props.description
						? this.props.description
						: 'Begin the questionnaire'}
				</aside>
				<div className="closing-section">
					<p className="closing-note">
						Please complete the upcoming questionnaire with care and
						honesty. <br />
						You'll be happy you did. <br />
						Your secrets are safe with me. <br />
					</p>
					<button
						className="continue-button-container"
						onClick={this.props.handleSuccessfulPage}
					>
						Continue
					</button>
				</div>
			</div>
		);
	}
}

QuestionnairePreview.propTypes = {
	description: PropTypes.string,
};

export default QuestionnairePreview;
