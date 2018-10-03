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
			<Menu secondary className="app-nav" style={{ paddingLeft: 0 }}>
				{this.props.AuthStore.isAuthenticated ? (
					<React.Fragment>
						<Menu.Item name="questionnaires">
							<Link to={'/admin'}>Home</Link>
						</Menu.Item>
						<Menu.Item name="questionnaires">
							<Link to={'/admin/questionnaires'}>
								Questionnaires
							</Link>
						</Menu.Item>
						<Menu.Item name="category-sets">
							<Link to={`/admin/categorySets`}>
								Category Sets
							</Link>
						</Menu.Item>
					</React.Fragment>
				) : (
					''
				)}

				<Menu.Menu position="right">
					{this.props.AuthStore.isAuthenticated ? (
						<Menu.Item
							name="logout"
							onClick={this.props.AuthStore.logout}
						/>
					) : (
						<Link to={'/admin/login'}>
							<Menu.Item name="login" />
						</Link>
					)}
				</Menu.Menu>
			</Menu>
		);
	}
}

export default Navigation;
