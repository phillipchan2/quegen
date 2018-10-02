import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('AuthStore')
@withRouter
@observer
class ProtectedRoute extends Component {
	render() {
		return this.props.AuthStore.isAuthenticated ? (
			<Route
				path={this.props.path}
				component={this.props.component}
				{...this.props}
			/>
		) : (
			<Redirect to="/login" />
		);
	}
}

export default ProtectedRoute;
