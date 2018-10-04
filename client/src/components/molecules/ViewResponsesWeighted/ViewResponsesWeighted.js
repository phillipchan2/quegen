import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import { Header, Rating, Table } from 'semantic-ui-react';

class ViewResponsesWeighted extends Component {
	render() {
		return (
			<div style={{ padding: '1em' }}>
				<Table celled padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell singleLine>Name</Table.HeaderCell>
							<Table.HeaderCell>Email</Table.HeaderCell>
							<Table.HeaderCell>Category</Table.HeaderCell>
							<Table.HeaderCell>Submitted On</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{this.props.responses.map(response => {
							return (
								<Table.Row>
									<Table.Cell>{response.name}</Table.Cell>
									<Table.Cell>{response.email}</Table.Cell>
									<Table.Cell>{response.category}</Table.Cell>
									<Table.Cell>
										{response.submittedOn}
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			</div>
		);
	}
}

ViewResponsesWeighted.propTypes = {
	responses: PropTypes.object
};

export default ViewResponsesWeighted;
