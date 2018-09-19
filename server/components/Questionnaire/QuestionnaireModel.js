const mongoose = require('mongoose');
const Mixed = mongoose.SchemaType.Mixed;

var questionSchema = new mongoose.Schema({
	label: {
		type: String,
		required: true
	},
	appliesToCategory: {
		type: [Number],
		required: false
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
		required: false
	},
	questions: [questionSchema],
	responses: [responseSchema]
});

var Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
