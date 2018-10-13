// libraries
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('AuthStore')
@observer
class Home extends Component {
	componentDidMount() {}
	render() {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '3em',
					flexDirection: 'column'
				}}
			>
				<p>
					Welcome to Quegen. Get your special quiz link from uyour
					moderator.
				</p>

				<p>Moderators can log in from the admin panel</p>
			</div>
		);
	}
}

export default Home;
