import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import ReactTable from 'react-table';

class ViewResponsesWeighted extends Component {
	render() {
		const columns = [
			{ Header: 'Name', accessor: 'name' },
			{
				Header: 'Email',
				accessor: 'email'
			},
			{
				Header: 'Category',
				accessor: 'category'
			},
			{
				Header: 'Submitted On',
				accessor: 'submittedOn'
			}
		];
		return (
			<div style={{ padding: '1em' }}>
				<ReactTable data={this.props.responses} columns={columns} />
			</div>
		);
	}
}

ViewResponsesWeighted.propTypes = {
	responses: PropTypes.object
};

export default ViewResponsesWeighted;
