import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

// components
import ReactTable from 'react-table';

class ViewResponsesText extends Component {
	render() {
		const columns = [
			{ Header: 'Name', accessor: 'name' },
			{ Header: 'Email', accessor: 'email' },
			{ Header: 'Question', accessor: 'title' },
			{ Header: 'Number', accessor: 'phone' },
			{ Header: 'Answer', accessor: 'value' },
			{ Header: 'Category', accessor: 'category' },
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
				<ReactTable
					filterable
					data={this.props.responses}
					defaultFilterMethod={(filter, row) =>
						String(row[filter.id])
							.toLowerCase()
							.startsWith(String(filter.value.toLowerCase()))
					}
					columns={columns}
				/>
			</div>
		);
	}
}

ViewResponsesText.propTypes = {
	responses: PropTypes.object
};

export default ViewResponsesText;
