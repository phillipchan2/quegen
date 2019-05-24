const express = require('express');
const router = express.Router();
const Questionnaire = require('./QuestionnaireModel');
const CategorySet = require('../CategorySet/CategorySetModel');
const QuestionnaireImpl = require('./QuestionnaireImpl');

router.get('/:id', (req, res, next) => {
	var id = req.params.id;

	Questionnaire.findOne({ _id: id }, (err, questionnaire) => {
		if (questionnaire) {
			let formattedQuestionnaire = questionnaire;

			formattedQuestionnaire['responses'] = null;

			res.status(200).json({
				success: true,
				data: formattedQuestionnaire,
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
				_id: id,
			},
			(err, questionnaire) => {
				if (!err) {
					var weightedResponses = QuestionnaireImpl.getWeightedResponses(
						response
					);

					var categoryIdWithMostReponses = QuestionnaireImpl.getCategoryIdWithMostResponses(
						questionnaire,
						weightedResponses
					);

					console.log(
						'TCL: categoryIdWithMostReponses',
						categoryIdWithMostReponses
					);

					CategorySet.findOne(
						{
							'categories._id': categoryIdWithMostReponses,
						},
						(err, categorySet) => {
							let category = categorySet.categories.find(
								category => {
									return (
										category._id ==
										categoryIdWithMostReponses
									);
								}
							);

							response.category = category.name;

							questionnaire.responses.push(response);
							questionnaire.save(err => {
								if (!err) {
									res.status(200).json({
										success: true,
										data: category,
									});
								} else {
									res.status(200).json({
										success: false,
										message: err,
									});
								}
							});
						}
					);
				} else {
					res.status(400).json({
						success: false,
						message: err,
					});
				}
			}
		);
	} else {
		res.status(400).json({
			success: false,
			message: 'Not found',
		});
	}
});

module.exports = router;
