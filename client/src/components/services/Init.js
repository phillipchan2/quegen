import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('AuthStore')
@observer
class Init extends Component {
	componentDidMount() {
		this.props.AuthStore.verifyToken();
	}
	render() {
		return <div />;
	}
}

export default Init;
