const mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

var responseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

var questionnaireSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	questions: [questionSchema],
	responses: [responseSchema]
});

var Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
