const mongoose = require('mongoose');
const config = require('../config/config');
let dbURL;
if (process.env.NODE_ENV === 'dev') {
	// dbURL = `mongodb://${config.host}/quegen`;
	dbURL = 'mongodb://phillipchan1:thebible321@ds223763.mlab.com:23763/quegen';
} else if (process.env.NODE_ENV === 'prod') {
	mLabUsername = process.env.MLAB_USERNAME;
	mLabPassword = process.env.MLAB_PASSWORD;

	dbURL = `mongodb://${mLabUsername}:${mLabPassword}@${config.host}`;
}

console.log(dbURL);
mongoose.connect(
	dbURL,
	err => {
		if (err) {
			console.log('Failed to connect to mongodb at ' + db);
		} else {
			console.log('Successfully connected to mongodb at ' + db);
		}
	}
);
