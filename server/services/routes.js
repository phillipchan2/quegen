const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../components/Auth/UserModel');
const userUtils = require('../utils/userUtils');

router.get('/hi', (req, res, next) => {
	res.send('hello');
});

// login routes
router.use('/auth', require('../components/Auth/AuthRoutes'));

// protected routes from here on out
router.use((req, res, next) => {
	var token =
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token'] ||
		req.headers.token;

	if (token) {
		jwt.verify(token, config.jwt_secret, function(err, decoded) {
			if (err) {
				res.json({
					success: false,
					message: 'Error: JWtoken invalid for route'
				});
			}
			// success:
			else {
				let decoded = jwt.decode(token);

				// find the user and pass the entire user for the rest of the routes
				User.findOne({ email: decoded.email }, function(err, user) {
					if (!user) {
						res.json({
							success: false,
							message: 'User not found'
						});
					} else {
						req.user = userUtils.formatSafeUser(user._doc);
						next();
					}
				});
			}
		});
	} else {
		res.status(403).json({
			success: false,
			message: 'Unauthorized to view this resource'
		});
	}
});

router.use(
	'/categorySets',
	require('../components/CategorySets/CategorySetsRoutes')
);

module.exports = router;
