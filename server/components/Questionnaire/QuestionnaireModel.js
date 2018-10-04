const mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

var questionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	appliesToCategories: {
		type: Mixed,
		required: false
	},
	type: {
		type: String,
		required: true
	}
});

var questionResponseSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	value: String
});

var responseSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	category: String,
	responses: [questionResponseSchema]
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
