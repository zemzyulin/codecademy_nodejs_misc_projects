const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for parsing and logging
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev')); 

// Swagger for documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/api-docs.json');
const customCss = fs.readFileSync((process.cwd()+"/docs/swagger.css"), 'utf8');

// Main router
const envelopesRouter = require('./resources/envelopes-router.js');
app.use('/api/envelopes', envelopesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

// Start page
app.get('/', (req, res, next) => {
    res.send(`Server running on port: ${PORT}.\n Go to http://localhost:4000/api-docs for instructions on routes.`);
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})