const express = require('express');
const router = express.Router();
const { envelopes, envelopeById, addEnvelope, updateEnvelope, deleteEnvelope, transfer } = require('./db.js');

router.param('envId', (req, res, next, id) => {
    if (isNaN(Number(id))) {
        res.status(404).send()
    } 
    const envelope = envelopeById(id);
    if (envelope) {
        req.envId = envelope.id;
        next();
    } else {
        res.status(404).send();
    }
});

// Main envelopes routes
router.get('/', (req, res, next) => {
    res.send(envelopes);
})
router.post('/', (req, res, next) => {
    const envelope = addEnvelope(req.body);
    envelope !== null ? res.status(201).send(envelope) : res.status(400).send('Invalid input');
})
router.get('/:envId', (req, res, next) => {
    const envelope = envelopeById(req.envId);
    res.send(envelope);
})
router.put('/:envId', (req, res, next) => {
    req.body.id = req.envId;
    const envelope = updateEnvelope(req.body);
    envelope !== null ? res.send(envelope) : res.status(400).send('Invalid input');
})
router.delete('/:envId', (req, res, next) => {
    const envelope = deleteEnvelope(req.envId);
    envelope !== null ? res.status(204).send() : res.status(400).send('Invalid input');
})

// Transfer funds beetween envelopes routes
router.post('/transfer/:fromId/:toId', (req, res, next) => {
    const transaction = transfer(req.params.fromId, req.params.toId, req.body.amount);
    transaction !== null ? res.send('Transfer completed') : res.status(400).send('Invalid input');
})


module.exports = router;
