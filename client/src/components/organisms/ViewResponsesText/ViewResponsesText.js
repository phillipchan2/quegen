import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

// components
import ReactTable from 'react-table';

class ViewResponsesText extends Component {
	render() {
		const columns = [
			{ Header: 'Name', accessor: 'name' },
			{
				Header: 'Question',
				accessor: 'title'
			},
			{
				Header: 'Email',
				accessor: 'email'
			},
			{
				Header: 'Answer',
				accessor: 'value'
			},
			{
				Header: 'Submitted On',
				accessor: 'submittedOn',
				sort: 'desc',
				render: props => (
					<Moment format={'YYYY/MM/DD'} date={props.value} />
				)
			}
		];
		return (
			<div style={{ padding: '1em' }}>
				<ReactTable data={this.props.responses} columns={columns} />
			</div>
		);
	}
}

ViewResponsesText.propTypes = {
	responses: PropTypes.object
};

export default ViewResponsesText;
