const express = require('express');
const router = express.Router();
const CategorySet = require('./CategorySetModel');

router.get('/', (req, res, next) => {
	CategorySet.find({}, (err, categorySets) => {
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

router.delete('/', (req, res, next) => {
	var id = req.body.id;

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
	var id = req.body.id;

	if (id) {
		let updateParams = req.body;

		delete updateParams.id;

		CategorySet.findOneAndUpdate(
			{
				_id: id
			},
			updateParams,
			(err, query) => {
				if (query) {
					if (query) {
						res.json({ success: true, data: query });
					} else {
						res.status(400).json({
							success: false,
							message: 'Not found'
						});
					}
				}
			}
		);
	} else {
		var newCategorySet = new CategorySet(req.body);

		newCategorySet.markModified('categories');

		newCategorySet.save((err, categorySet) => {
			if (!err) {
				res.json({ success: true, categorySet: categorySet });
			} else {
				res.status(400).json({ success: false, message: err });
			}
		});
	}
});

module.exports = router;
