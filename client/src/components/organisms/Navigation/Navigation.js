// libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import { Menu } from 'semantic-ui-react';

class Navigation extends Component {
	render() {
		return (
			<Menu secondary className="app-nav">
				<Menu.Item name="questionnaires">
					<Link to={'/'}>Home</Link>
				</Menu.Item>
				<Menu.Item name="category-sets">
					<Link to={'/categorySets'}>Category Sets</Link>
				</Menu.Item>

				<Menu.Menu position="right">
					<Menu.Item name="logout" onClick={this.handleItemClick} />
				</Menu.Menu>
			</Menu>
		);
	}
}

export default Navigation;
