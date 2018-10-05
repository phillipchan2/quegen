import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import ReactTable from 'react-table';

class ViewResponsesWeighted extends Component {
	render() {
		const data = [
			{
				name: 'Joe',
				age: 23,
				friend: { name: 'Phil', age: 25 }
			},
			{
				name: 'Tanner Linsley',
				age: 26,
				friend: { name: 'Jason Maurer', age: 23 }
			}
		];

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
		]; // Custom cell components!
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
