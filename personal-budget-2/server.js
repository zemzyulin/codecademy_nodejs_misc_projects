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
    res.format({
        'text/html': function () {
            res.send('<h3>Personal Budget 2 Project for Codecademy\'s NodeJS Path</h3><br>' + 
            '<div>For documentation please visit: <a href="https://personal-budget-2.herokuapp.com/api-docs/">https://personal-budget-2.herokuapp.com/api-docs/</a></div>' + 
            '<div>or if running locally: <a href="http://localhost:4000/api-docs">http://localhost:4000/api-docs</a></div>');
        },
        default: function () {
            res.send(`For documentation please visit: https://personal-budget-2.herokuapp.com/api-docs/ 
                Or if running locally: http://localhost:${PORT}/api-docs`);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})
