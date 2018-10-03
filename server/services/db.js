const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost/quegen';

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
