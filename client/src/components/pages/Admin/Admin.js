import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// service components
import Init from '../../services/Init';

// components
import Navigation from '../../organisms/Navigation/Navigation';
import CategorySets from '../../pages/CategorySets/CategorySets';

class Admin extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<Router>
					<Route
						path={`${this.props.match.url}/categorySets`}
						component={CategorySets}
						exact
					/>
				</Router>
			</div>
		);
	}
}

export default Admin;
