const express = require('express');
const router = express.Router();
const Questionnaire = require('./QuestionnaireModel');

router.get('/', (req, res, next) => {
	Questionnaire.find({}, (err, Questionnaires) => {
		if (!err) {
			res.json({
				success: true,
				data: Questionnaires
			});
		} else {
			res.status(400).json({ success: false, message: err });
		}
	});
});

router.delete('/', (req, res, next) => {
	var id = req.body.id;

	Questionnaire.findOneAndDelete(
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

		Questionnaire.findOneAndUpdate(
			{
				_id: id
			},
			updateParams,
			(err, query) => {
				if (query) {
					res.json({ success: true, data: query });
				} else {
					res.status(400).json({
						success: false,
						message: 'Not found'
					});
				}
			}
		);
	} else {
		var newQuestionnaire = new Questionnaire(req.body);

		newQuestionnaire.markModified('questions');

		newQuestionnaire.save((err, Questionnaire) => {
			if (!err) {
				res.json({ success: true, Questionnaire: Questionnaire });
			} else {
				res.status(400).json({ success: false, message: err });
			}
		});
	}
});

router.post('/:id/submit', (req, res, next) => {
	var id = req.params.id;

	if (id) {
		let response = req.body;

		Questionnaire.findOne(
			{
				_id: id
			},
			(err, questionnaire) => {
				if (!err) {
					questionnaire.responses.push(response);
					questionnaire.save(err => {
						if (!err) {
							res.status(200).json({
								success: true,
								data: questionnaire
							});
						} else {
							res.status(400).json({
								success: false,
								message: err
							});
						}
					});
				} else {
					res.status(400).json({
						success: false,
						message: err
					});
				}
			}
		);
	} else {
		res.status(400).json({
			success: false,
			message: 'Not found'
		});
	}
});

module.exports = router;
