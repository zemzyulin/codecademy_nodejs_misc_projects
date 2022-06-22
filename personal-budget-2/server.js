const express = require('express'),
    dotenv = require("dotenv");
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    app = express(),
    PORT = process.env.PORT || 4000;

dotenv.config({ path: "./config/config.env" });

// Middleware for parsing and logging
app.use(bodyParser.json());
app.use(logger('dev'));

// Mount routers
const envelopesRouter = require('./routers/envelopes');
const transactionsRouter = require('./routers/transactions');
app.use('/api/envelopes', envelopesRouter);
app.use('/api/transactions', transactionsRouter);


// Start server
app.get('/', (req, res, next) => {
    res.send(`Server running on port: ${PORT}.`);
})
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})
