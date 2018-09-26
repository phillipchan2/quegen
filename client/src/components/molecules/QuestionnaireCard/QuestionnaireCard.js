import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Segment, Label, Header, Menu, Icon } from 'semantic-ui-react';

class QuestionnaireCard extends Component {
	handleDeleteQuestionnaire(e) {
		const id = e.target.parentNode.parentNode.parentNode.dataset.id;
		const jwtoken = localStorage.getItem('jwtoken');

		axios
			.delete(`/api/questionnaire/`, {
				headers: {
					token: jwtoken
				},
				data: {
					_id: id
				}
			})
			.then(res => {});
	}

	render() {
		return (
			<Segment fluid data-id={this.props.questionnaire._id}>
				<Header>{this.props.questionnaire.name}</Header>

				<Menu secondary>
					<Menu.Menu position="right">
						{this.props.questionnaire.published ? (
							<Menu.Item>
								<Icon name="check circle outline" />
								Published
							</Menu.Item>
						) : (
							<Menu.Item disabled>Not Published</Menu.Item>
						)}

						<Menu.Item>
							<Link
								to={`questionnaire/${
									this.props.questionnaire._id
								}`}
							>
								<Icon name="edit" />
								Edit
							</Link>
						</Menu.Item>
						<Menu.Item
							onClick={this.handleDeleteQuestionnaire.bind(this)}
						>
							<Icon name="trash" />
							Delete
						</Menu.Item>
					</Menu.Menu>
				</Menu>
			</Segment>
		);
	}
}

export default QuestionnaireCard;
