// libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

// components
import { Menu } from 'semantic-ui-react';

@inject('AuthStore')
@observer
class Navigation extends Component {
	render() {
		return (
			<Menu secondary className="app-nav">
				<Menu.Item name="questionnaires">
					<Link to={'/'}>Home</Link>
				</Menu.Item>
				<Menu.Item name="questionnaires">
					<Link to={'/questionnaires'}>Questionnaires</Link>
				</Menu.Item>
				<Menu.Item name="category-sets">
					<Link to={'/categorySets'}>Category Sets</Link>
				</Menu.Item>

				<Menu.Menu position="right">
					{this.props.AuthStore.isAuthenticated ? (
						<Menu.Item
							name="logout"
							onClick={this.props.AuthStore.logout}
						/>
					) : (
						<Link to={'/login'}>
							<Menu.Item name="login" />
						</Link>
					)}
				</Menu.Menu>
			</Menu>
		);
	}
}

export default Navigation;
