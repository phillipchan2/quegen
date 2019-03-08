import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { inject, observer } from 'mobx-react'

// components
import { Segment, Header, Menu, Icon } from 'semantic-ui-react'

@inject('AppMessagingStore')
@inject('QuestionnaireStore')
@observer
class QuestionnaireCard extends Component {
	handleDeleteQuestionnaire(e) {
		const confirmDelete = window.confirm(`Are you sure you want to delete?`)

		if (confirmDelete) {
			const id = e.target.parentNode.parentNode.parentNode.dataset.id
			const jwtoken = localStorage.getItem('jwtoken')

			axios
				.delete(`/api/questionnaire/${id}`, {
					headers: {
						token: jwtoken,
					},
					data: {
						_id: id,
					},
				})
				.then(res => {
					if (res.data.success) {
						this.props.QuestionnaireStore.getQuestionnaires()

						this.props.AppMessagingStore.showAppMessage(
							'Successfully Deleted'
						)
					}
				})
		}
	}

	render() {
		return (
			<Segment fluid data-id={this.props.questionnaire._id}>
				<Header>{this.props.questionnaire.name}</Header>

				<Menu secondary>
					<Menu.Menu position="right">
						<Menu.Item>
							<Link
								to={`/admin/questionnaire/${
									this.props.questionnaire._id
								}`}
							>
								<Icon name="edit" />
								Edit
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link
								to={`/questionnaires/${
									this.props.questionnaire._id
								}`}
							>
								<Icon name="check file outline" />
								View
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link
								to={`/admin/questionnaire/${
									this.props.questionnaire._id
								}/responses`}
							>
								<Icon name="table" />
								View Responses
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
		)
	}
}

QuestionnaireCard.propTypes = {
	questionnaire: PropTypes.object.isRequired,
}

export default QuestionnaireCard
