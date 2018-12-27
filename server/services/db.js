const mongoose = require('mongoose');
const config = require('../config/config');
let dbURL;

if (process.env.NODE_ENV === 'dev') {
	dbURL = `mongodb://${config.host}/${config.db_name}`;
} else if (process.env.NODE_ENV === 'production') {
	mLabUsername = process.env.MLAB_USERNAME;
	mLabPassword = process.env.MLAB_PASSWORD;

	dbURL = `mongodb://${mLabUsername}:${mLabPassword}@${config.host}:${
		config.port
	}/${config.db_name}`;
}

console.log('dbURL', dbURL);

mongoose.connect(
	dbURL,
	err => {
		if (err) {
			console.log('Failed to connect to mongodb at ' + dbURL);
		} else {
			console.log('Successfully connected to mongodb at ' + dbURL);
		}
	}
);
