import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Segment, Label, Header, Menu, Icon, Button } from 'semantic-ui-react';

class CategorySetCard extends Component {
	handleDeleteCategorySet(e) {
		const id = e.target.parentNode.parentNode.parentNode.dataset.id;
		const jwtoken = localStorage.getItem('jwtoken');

		axios
			.delete(`/api/categorySet/`, {
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
			<Segment fluid data-id={this.props.categorySet._id}>
				<Header>{this.props.categorySet.name}</Header>
				{this.props.categorySet.categories
					? this.props.categorySet.categories.map(category => {
							return <Label>{category.name}</Label>;
					  })
					: 'No categories'}

				<Menu secondary>
					<Menu.Menu position="right">
						<Menu.Item>
							<Link
								to={`categorySet/${this.props.categorySet._id}`}
							>
								<Icon name="edit" />
								Edit
							</Link>
						</Menu.Item>
						<Menu.Item
							onClick={this.handleDeleteCategorySet.bind(this)}
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

export default CategorySetCard;
