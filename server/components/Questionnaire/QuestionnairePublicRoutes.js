const express = require('express');
const router = express.Router();
const Questionnaire = require('./QuestionnaireModel');

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	Questionnaire.findOne({ _id: id }, (err, questionnaire) => {
		if (questionnaire) {
			let formattedQuestionnaire = questionnaire;

			formattedQuestionnaire['responses'] = null;

			res.status(200).json({
				success: true,
				data: formattedQuestionnaire
			});
		} else {
			res.status(400).json({ success: false, message: 'Not Found' });
		}
	});
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
