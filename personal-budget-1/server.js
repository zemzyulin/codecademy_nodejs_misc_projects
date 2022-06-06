const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for parsing and loggin
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

const envelopesRouter = require('./resources/envelopes-router.js');
app.use('/api/envelopes', envelopesRouter);


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})