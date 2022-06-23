const express = require('express'),
    router = express.Router();
    
const { getEnvelopes, 
        addEnvelope, 
        getEnvelopeById, 
        updateEnvelope, 
        deleteEnvelope, 
        transferEnvelopes } = require('../controllers/envelopes');

// Get all envelopes
router.get('/', getEnvelopes);
// Add one envelope
router.post('/', addEnvelope);
// Get one envelope
router.get('/:id', getEnvelopeById);
// Update one envelope
router.put('/:id', updateEnvelope);
// Delete one envelope
router.delete('/:id', deleteEnvelope);
// Transfer funds between envelopes
router.post('/transfer/:fromId/:toId', transferEnvelopes);


module.exports = router;