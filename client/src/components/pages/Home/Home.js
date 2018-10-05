// libraries
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('AuthStore')
@observer
class Home extends Component {
	componentDidMount() {}
	render() {
		return <div />;
	}
}

export default Home;
