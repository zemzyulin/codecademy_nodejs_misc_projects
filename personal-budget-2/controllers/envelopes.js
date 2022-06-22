const { pool } = require("../config/access");

// Get all envelopes (@get /api/envelopes)
const getEnvelopes = async (req, res, next) => {
    try {
        const results = await pool.query('SELECT * FROM envelopes ORDER BY id');
        if (results.rowCount < 1) {
            res.status(404).send('Records not found');
        } else {
            res.status(200).send(results.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}
// Add envelope (@post /api/envelopes)
const addEnvelope = async (req, res, next) => {
    const { category, amount } = req.body;
    try {
        const results = await pool.query('INSERT INTO envelopes (category, amount) VALUES ($1, $2) RETURNING *', [category, amount]);
        res.status(201).send(results.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
// Get envelope by ID (@get /api/envelopes/{id})
const getEnvelopeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const results = await pool.query('SELECT * FROM envelopes WHERE id = $1', [id]);
        if (results.rowCount < 1) {
            res.status(404).send('Envelope not found');
        } else {
        res.status(200).send(results.rows[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}
// Update envelope by ID (@put /api/envelopes/{id})
const updateEnvelope = async (req, res, next) => {
    const { id } = req.params;
    const { category, amount } = req.body;
    try {
        const results = await pool.query('UPDATE envelopes SET category = $1, amount = $2 WHERE id = $3 RETURNING *', [category, amount, id]);
        if (results.rowCount < 1) {
            res.status(404).send('Envelope not found');
        } else {
        res.status(200).send(results.rows[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}
// Delete envelope by ID (@delete /api/envelopes/{id})
const deleteEnvelope = async (req, res, next) => {
    const { id } = req.params;
    try {
        const checkId = await pool.query('SELECT * FROM envelopes WHERE id = $1', [id]);
        if (checkId.rowCount < 1) {
            res.status(404).send('Envelope not found');
        } else {
            await pool.query('DELETE FROM envelopes WHERE id = $1', [id]);
            res.status(204).send('Envelope deleted');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}
// Transfer funds between envelopes (@post /api/envelopes/transfer/{fromId}/{toId})
const transferEnvelopes = async (req, res, next) => {
    const { fromId, toId } = req.params;
    const { amount } = req.body;
    try {
        // Validate data
        const checkFromId = await pool.query('SELECT * FROM envelopes WHERE id = $1', [fromId]);
        const checkToId = await pool.query('SELECT * FROM envelopes WHERE id = $1', [toId]);
        if (checkFromId.rowCount < 1 || checkToId.rowCount < 1) {
            res.status(404).send('Envelope not found');
        } else if (parseInt(checkFromId.rows[0].amount) - amount < 0) {
            res.status(400).send('Insufficient funds in envelope');
        } else if (amount < 0 || isNaN(Number(amount))) {
            res.status(400).send('Invalid input');
        // Apply changes to database
        } else {
            const fromAmount = (parseInt(checkFromId.rows[0].amount) - amount).toString();
            const toAmount = (parseInt(checkToId.rows[0].amount) + amount).toString();
            await pool.query('UPDATE envelopes SET amount = $1 WHERE id = $2', [fromAmount, fromId]);
            await pool.query('UPDATE envelopes SET amount = $1 WHERE id = $2', [toAmount, toId]);
            res.status(200).send('Funds transferred successfully');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = { getEnvelopes, addEnvelope, getEnvelopeById, updateEnvelope, deleteEnvelope, transferEnvelopes, pool }