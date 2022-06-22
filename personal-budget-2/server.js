const express = require('express'),
    dotenv = require("dotenv");
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    fs = require('fs');
    app = express(),
    PORT = process.env.PORT || 4000;

dotenv.config({ path: "./config/config.env" });

// Middleware for parsing and logging
app.use(bodyParser.json());
app.use(logger('dev'));

// Swagger for documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/api-docs.json');
const customCss = fs.readFileSync((process.cwd()+"/docs/swagger.css"), 'utf8');

// Mount routers
const envelopesRouter = require('./routers/envelopes');
const transactionsRouter = require('./routers/transactions');
app.use('/api/envelopes', envelopesRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

// Start server
app.get('/', (req, res, next) => {
    res.send(`Server running on port: ${PORT}.\n Go to http://localhost:${PORT}/api-docs for instructions on routes.`);
})
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})
