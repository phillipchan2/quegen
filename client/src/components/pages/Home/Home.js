// libraries
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('AuthStore')
@observer
class Home extends Component {
	componentDidMount() {}
	render() {
		return (
			<div>
				Home Page {this.props.AuthStore.isAuthenticated ? 'yup' : 'no'}
			</div>
		);
	}
}

export default Home;
