const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	resultDescription: {
		type: String,
		required: true
	}
});

var categorySetSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	categories: [categorySchema]
});

var CategorySet = mongoose.model('CategorySet', categorySetSchema);

module.exports = CategorySet;
