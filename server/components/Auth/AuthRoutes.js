const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./UserModel');
const config = require('../../config/config');
const userUtils = require('../../utils/userUtils');

router.post('/register', function(req, res, next) {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (req.body.email && req.body.password) {
			if (user) {
				res.status(400).json({
					success: false,
					message: 'User Already Exist'
				});
			} else {
				let newUser = new User({
					email: req.body.email,
					password: req.body.password
				});

				newUser.save();

				res.status(200).json({
					success: true,
					message: 'New User Created'
				});
			}
		} else {
			res.status(400).json({
				success: false,
				message: 'Email or Password Missing'
			});
		}
	});
});

router.post('/login', function(req, res, next) {
	if (!req.body.email || !req.body.password) {
		return res.json({
			success: false,
			message: 'Provide Username or Password'
		});
	}

	User.findOne({ email: req.body.email }, (err, user) => {
		if (user) {
			User.authenticate(
				req.body.email,
				req.body.password,
				(err, user) => {
					if (user) {
						// prepare jwt token
						var token = jwt.sign(user._doc, config.jwt_secret, {
							expiresIn: '7d'
						});

						user.save(function(err, user) {
							if (!err) {
								res.status(200).json({
									message: 'Login Successful',
									success: true,
									token: token,
									user: userUtils.formatSafeUser(user._doc)
								});
							}
						});
					} else {
						res.status(400).json({
							success: false,
							message: 'Email or Password Invalid'
						});
					}
				}
			);
		} else {
			res.status(400).json({
				success: false,
				message: 'Email or Password Invalid'
			});
		}
	});
});

router.get('/verify', function(req, res, next) {
	var token = req.headers.token;

	if (token) {
		jwt.verify(token, config.jwt_secret, function(err, decoded) {
			console.log(decoded);
			if (err) {
				res.json({
					success: false,
					message: 'Authentication Error: Invalid/No JWtoken Provided'
				});
			} else {
				// make sure user still exists
				User.findOne({ email: decoded.email }, function(err, user) {
					if (!user) {
						res.json({
							success: false,
							message: 'User not found'
						});
					} else {
						// User exists, JWtoken valid: Success
						res.json({
							success: true,
							message: 'Success! JWtoken Valid',
							user: userUtils.formatSafeUser(user._doc)
						});
					}
				});
			}
		});
	} else {
		res.json({
			success: false,
			message: 'Authentication Error: Invalid/No JWtoken Provided'
		});
	}
});

// protected routes middleware
// everything below is protected
router.use(function(req, res, next) {
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
			succes: false,
			message: 'Unauthorized to view this resource'
		});
	}
});

router.get('/protectedRoute', function(req, res, next) {
	res.json({
		hi: 'hello',
		user: req.user
	});
});

module.exports = router;
