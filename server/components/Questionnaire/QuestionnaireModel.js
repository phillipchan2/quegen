const mongoose = require('mongoose');
const Mixed = mongoose.SchemaType.Mixed;

var questionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	appliesToCategory: {
		type: [Number],
		required: false
	},
	type: {
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
		required: false
	},
	published: {
		type: Boolean,
		default: false
	},
	categorySetId: {
		type: String,
		required: true
	},
	questions: [questionSchema],
	responses: [responseSchema]
});

var Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
