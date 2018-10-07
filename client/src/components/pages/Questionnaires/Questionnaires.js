import React, { Component } from 'react';

// components
import QuestionnairesList from '../../organisms/QuestionnairesList/QuestionnairesList';
import { Header, Divider, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Questionnaires extends Component {
	render() {
		return (
			<div>
				<Header as="h1">Questionnaires</Header>
				<Link to={`/admin/questionnaire/new`}>
					<Button>New Questionnaire</Button>
				</Link>
				<Divider />
				<QuestionnairesList />
			</div>
		);
	}
}

export default Questionnaires;
