const mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

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
