const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	resultDescription: {
		type: String,
		required: true
	},
	imageUrl: {
		required: true,
		type: String
	}
});

var categorySetSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	categories: [categorySchema],
	userId: {
		type: String,
		required: true
	}
});

var CategorySet = mongoose.model('CategorySet', categorySetSchema);

module.exports = CategorySet;
