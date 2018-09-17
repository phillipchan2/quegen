const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
	name: String,
	resultDescription: String
});

var categorySetSchema = new mongoose.Schema({
	name: String,
	categories: [categorySchema]
});

var CategorySet = mongoose.model('CategorySet', categorySetSchema);

module.exports = CategorySet;
