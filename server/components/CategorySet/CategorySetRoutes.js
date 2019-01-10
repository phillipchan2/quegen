const express = require('express');
const router = express.Router();
const CategorySet = require('./CategorySetModel');
const errorMessages = require('../../utils/errorMessages');

router.get('/', (req, res, next) => {
	CategorySet.find({ userId: req.user._id }, (err, categorySets) => {
		if (!err) {
			res.json({
				success: true,
				data: categorySets
			});
		} else {
			res.status(400).json({ success: false, message: err });
		}
	});
});

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	CategorySet.findOne({ _id: id }, (err, categorySet) => {
		if (categorySet) {
			// make sure user is viewing its own category sets
			if (categorySet.userId !== req.user._id) {
				console.log('unauthorized');
				res.json({
					success: false,
					message: errorMessages.unauthorized
				});

				// success
			} else {
				res.status(200).json({
					success: true,
					data: categorySet
				});
			}
		} else {
			res.status(200).json({
				success: false,
				message: 'Not Found'
			});
		}
	});
});

router.delete('/', (req, res, next) => {
	var id = req.body._id;

	CategorySet.findOneAndDelete(
		{
			_id: id
		},
		(err, query) => {
			if (query) {
				res.json({ success: true, data: query });
			} else {
				res.status(400).json({ success: false, message: 'Not found' });
			}
		}
	);
});

router.post('/', (req, res, next) => {
	var id = req.body._id;

	if (id) {
		let updateParams = req.body;

		delete updateParams.id;

		CategorySet.findOneAndUpdate(
			{
				_id: id
			},
			updateParams,
			(err, query) => {
				if (!err) {
					if (query) {
						res.json({ success: true, data: query });
					} else {
						res.status(200).json({
							success: false,
							message: 'Not found'
						});
					}
				} else {
					res.status(200).json({
						success: false,
						message: err
					});
				}
			}
		);
	} else {
		var newCategorySet = new CategorySet(
			Object.assign(req.body, { userId: req.user._id })
		);

		newCategorySet.markModified('categories');

		newCategorySet.save((err, categorySet) => {
			if (!err) {
				res.json({ success: true, categorySet: categorySet });
			} else {
				res.status(200).json({
					success: false,
					err
				});
			}
		});
	}
});

module.exports = router;
