const express = require('express');
const router = express.Router();
const CategorySets = require('./CategorySetsModel');

router.get('/', (req, res, next) => {
	res.send('in route');
});

module.exports = router;
