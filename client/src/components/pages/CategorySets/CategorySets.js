import React, { Component } from 'react';

// components
import { Button, Divider } from 'semantic-ui-react';
import CategorySetsList from '../../organisms/CategorySetsList/CategorySetsList';
import { Link } from 'react-router-dom';

class CategorySets extends Component {
	render() {
		return (
			<div>
				<header>
					<Button>
						<Link to={`/categorySet/new`}>New Category Set</Link>
					</Button>
				</header>
				<Divider />
				<CategorySetsList />
			</div>
		);
	}
}

export default CategorySets;
