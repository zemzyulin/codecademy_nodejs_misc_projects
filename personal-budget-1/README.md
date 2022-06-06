## Codecademy's NodeJS Path: *Personal Budget 1* Project

### Short description
__Project Title:__ Personal Budget 1  
__Description:__ Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update and delete envelopes. Also, users can transfer funds between envelopes.

__Features:__
1. Complete system of routes to handle all requests from front-end.
2. Basic input validation for all requests.

__How to use:__
1. Install dependencies with `npm install`.
2. Launch server with `node server.js` or `npm run start`

__Technology:__ JavaScript, Node.js, Express.  

__Additional info on routes for testing:__
 - Retrieve envelopes using `GET /api/envelopes`
 - Retrieve a single envelope using `GET /api/envelopes/{id}`
 - Create an envelope using `POST /api/envelopes`
 - Update an envelope using `PUT /api/envelopes/{id}`
 - Delete an envelope using `DELETE /api/envelopes/{id}`
 - Transfer money between envelopes using `POST /api/envelopes/transfer/{fromId}/{toId}`  


<br>
<br>

Best regards,  
Yehor Zemzyulin