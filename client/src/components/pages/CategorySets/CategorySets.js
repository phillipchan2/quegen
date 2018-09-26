import React, { Component } from 'react';

// components
import { Button, Divider } from 'semantic-ui-react';
import CategorySetsList from '../../organisms/CategorySetsList/CategorySetsList';

class CategorySets extends Component {
	render() {
		return (
			<div>
				<header>
					<Button onClick={this.handleNewCategorySetClick}>
						New Category Set
					</Button>
				</header>
				<Divider />
				<CategorySetsList />
			</div>
		);
	}
}

export default CategorySets;
