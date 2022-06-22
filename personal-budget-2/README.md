## Codecademy's NodeJS Path: *Personal Budget 2* Project

### Short description
__Project Title:__ Personal Budget 2  
__Description:__ Node/Express API to manage a portfolio budget using a budget envelope strategy. Data is stored in PostgreSQL database.  
__User can:__
- Create, read, update and delete envelopes
- Transfer funds between envelopes
- Create, read, update and delete transactions (records of funds spent from each envelope)

### Features
1. Complete system of routes to handle all requests from front-end.
2. Data is stored/retrieved from PostgreSQL database.
3. Input validation for all requests.

__How to use__
1. Install dependencies with `npm install`
2. Launch server with `node server.js` or `npm run start`

__Technology:__ JavaScript, Node.js, Express, PostgreSQL

### Documentation
__Test with Swagger:__
Documentation and testing available at `http://localhost:4000/api-docs`

__Additional info on routes for testing:__  
 - Retrieve envelopes using `GET /api/envelopes`
 - Retrieve a single envelope using `GET /api/envelopes/{id}`
 - Create an envelope using `POST /api/envelopes`
 - Update an envelope using `PUT /api/envelopes/{id}`
 - Delete an envelope using `DELETE /api/envelopes/{id}`
 - Transfer money between envelopes using `POST /api/envelopes/transfer/{fromId}/{toId}`  
 - Retrieve transactions using `GET /api/transactions`
 - Retrieve a single transaction using `GET /api/transactions/{id}`
 - Create a transaction using `POST /api/transactions`
 - Update a transaction using `PUT /api/transactions/{id}`
 - Delete a transaction using `DELETE /api/transactions/{id}`


<br>
<br>

Best regards,  
Yehor Zemzyulin