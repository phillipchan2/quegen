const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./UserModel');
const config = require('../../config/config');
const userUtils = require('../../utils/userUtils');

router.post('/register', (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (req.body.email && req.body.password) {
			if (user) {
				res.status(200).json({
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

router.post('/login', (req, res, next) => {
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
						res.status(200).json({
							success: false,
							message: 'Email or Password Invalid'
						});
					}
				}
			);
		} else {
			res.status(200).json({
				success: false,
				message: 'Email or Password Invalid'
			});
		}
	});
});

router.get('/verify', (req, res, next) => {
	var token = req.headers.token;

	if (token) {
		jwt.verify(token, config.jwt_secret, function(err, decoded) {
			if (err) {
				res.status(400).json({
					success: false,
					message: 'Authentication Error: Invalid/No JWtoken Provided'
				});
			} else {
				// make sure user still exists
				User.findOne({ email: decoded.email }, function(err, user) {
					if (!user) {
						res.status(400).json({
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

module.exports = router;
