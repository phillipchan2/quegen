const express = require('express');
const router = express.Router();
const CategorySet = require('./CategorySetModel');

router.get('/', (req, res, next) => {
	res.send('in route');
});

module.exports = router;
