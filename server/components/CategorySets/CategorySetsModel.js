const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
	name: String,
	resultDescription: String
});

var categorySetsSchema = new mongoose.Schema({
	name: String,
	description: String,
	categories: [categorySchema]
});

var CategorySets = mongoose.model('CategorySets', categorySetsSchema);

module.exports = CategorySets;
