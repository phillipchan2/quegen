const express = require('express');
const path = require('path');
const app = express();
const parser = require('body-parser');
const port = process.env.PORT || 5000;

// get method for parsing body
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// db
require('./services/db');

// routes
app.use('/api', require('./services/routes'));

app.use('/', express.static(path.join(__dirname, '../client/build')));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
