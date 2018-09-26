import React, { Component } from 'react';
import { Card, Label } from 'semantic-ui-react';

class CategorySetCard extends Component {
	render() {
		return (
			<Card fluid>
				<Card.Content>
					<Card.Header>{this.props.categorySet.name}</Card.Header>
					{this.props.categorySet.categories
						? this.props.categorySet.categories.map(category => {
								return <Label>{category.name}</Label>;
						  })
						: 'No categories'}
				</Card.Content>
			</Card>
		);
	}
}

export default CategorySetCard;
