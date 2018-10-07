import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppMessage extends Component {
	render() {
		return <div id="app-message">{this.props.message}</div>;
	}
}

AppMessage.propTypes = {
	message: PropTypes.string
};

export default AppMessage;
