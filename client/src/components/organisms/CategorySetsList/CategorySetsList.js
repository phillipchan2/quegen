import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// components
import CategorySetCard from '../../molecules/CategorySetCard/CategorySetCard';
import { Link } from 'react-router-dom';

@inject('CategorySetStore')
@observer
class CategorySetsList extends Component {
	componentDidMount() {
		this.props.CategorySetStore.getCategorySets();
	}

	render() {
		return (
			<div>
				{this.props.CategorySetStore.categorySets.map(categorySet => {
					return (
						<Link
							to={`categorySet/${categorySet._id}`}
							style={{ marginBottom: '1em', display: 'block' }}
						>
							<CategorySetCard categorySet={categorySet} />
						</Link>
					);
				})}
			</div>
		);
	}
}

export default CategorySetsList;
