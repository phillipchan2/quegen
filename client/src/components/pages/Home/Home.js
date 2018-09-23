// libraries
import React, { Component } from 'react';
import { Provider, inject, observer } from 'mobx-react';

// services
import AuthStore from '../../../stores/AuthStore';

@inject('authStore')
@observer
class Home extends Component {
	render() {
		return (
			<div>
				Home Page {this.props.authStore.isAuthenticated ? 'yup' : 'no'}
			</div>
		);
	}
}

export default Home;
