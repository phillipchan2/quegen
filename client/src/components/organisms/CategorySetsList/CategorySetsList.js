import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// components
import CategorySetCard from '../../molecules/CategorySetCard/CategorySetCard';

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
						<CategorySetCard
							key={categorySet._id}
							categorySet={categorySet}
						/>
					);
				})}
			</div>
		);
	}
}

export default CategorySetsList;
