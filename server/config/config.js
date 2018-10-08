const env = process.env.NODE_ENV;

const environmentSettings = {
	dev: {
		host: 'localhost'
	},
	production: {
		host: 'ds223763.mlab.com',
		port: 23763
	}
};

const global = {
	jwt_secret: 'motherspie',
	db_name: 'quegen'
};

module.exports = Object.assign(environmentSettings[env], global);
