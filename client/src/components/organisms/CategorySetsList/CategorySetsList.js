import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('CategorySetStore')
@observer
class CategorySetsList extends Component {
	componentDidMount() {
		this.props.CategorySetStore.getCategorySets();
	}

	render() {
		return (
			<div>
				category set list
				{this.props.CategorySetStore.categorySets.map(categorySet => {
					return <div>{categorySet.name}</div>;
				})}
			</div>
		);
	}
}

export default CategorySetsList;
