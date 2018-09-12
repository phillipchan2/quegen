const mongoose = require('mongoose');

var categorySetsSchema = new mongoose.Schema({
	name: String
});

var CategorySets = mongoose.model('CategorySets', categorySetsSchema);

module.exports = CategorySets;
