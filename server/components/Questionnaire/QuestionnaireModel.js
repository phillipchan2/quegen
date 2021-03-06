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
	},
	choices: {
		type: Mixed,
		required: false
	}
});

var questionResponseSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	value: String,
	type: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: false
	}
});

var responseSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	phone: {
		type: Number
	},
	name: {
		type: String,
		required: true
	},
	category: String,
	submittedOn: Date,
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
	responses: [responseSchema],
	password: String,
	userId: {
		required: true,
		type: String
	}
});

var Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
