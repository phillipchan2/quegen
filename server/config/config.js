const env = process.env.NODE_ENV;

const environmentSettings = {
	dev: {
		host: 'localhost'
	},
	prod: {
		host: 'ds223763.mlab.com',
		port: 23763
	}
};

//<dbuser>:<dbpassword>@ds223763.mlab.com:23763/quegen

const global = {
	jwt_secret: 'motherspie',
	db_name: 'quegen'
};

module.exports = Object.assign(environmentSettings[env], global);
