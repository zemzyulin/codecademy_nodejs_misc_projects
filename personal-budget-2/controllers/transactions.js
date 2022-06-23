const { pool } = require("../config/access");

// Get all transactions (@get /api/transactions)
const getTransactions = async (req, res, next) => {
    try {
        const results = await pool.query('SELECT * FROM transactions ORDER BY id');
        if (results.rowCount < 1) {
            res.status(404).send('Records not found');
        } else {
            res.status(200).send(results.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Make a transaction (@post /api/transactions)
const makeTransaction = async (req, res, next) => {
    const { category, amount, receipient } = req.body;
    const date = new Date;
    try {
        // Validate data
        const envelope = await pool.query('SELECT id, amount FROM envelopes WHERE category = $1', [category])
        if (envelope.rowCount < 1) {
            res.status(404).send('Envelope not found');
        } else if (parseInt(envelope.rows[0].amount) - amount < 0) {
            res.status(400).send('Insufficient funds in envelope');
        } else {
            // Add transaction to database
            const results = await pool.query('INSERT INTO transactions (envelope_id, amount, receipient, date) VALUES ($1, $2, $3, $4)  RETURNING *',
                [envelope.rows[0].id, amount, receipient, date]);
            // Update envelope
            await pool.query('UPDATE envelopes SET amount = $1 WHERE id = $2', [parseInt(envelope.rows[0].amount) - parseInt(amount), envelope.rows[0].id])
            // Send response
            res.status(201).send(results.rows[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Get transaction by ID (@get /api/transactions/{id})
const getTransaction = async (req, res, next) => {
    const { id } = req.params;
    try {
        const results = await pool.query('SELECT * FROM transactions WHERE id = $1', [id]);
        if (results.rowCount < 1) {
            res.status(404).send('Transaction not found');
        } else {
        res.status(200).send(results.rows[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Update transaction by ID (@put /api/transactions/{id})
const updateTransaction = async (req, res, next) => {
    const { id } = req.params;
    const { category, amount, receipient } = req.body;
    const date = new Date;
    try {
        // Validate data
        const envelope = await pool.query('SELECT id, amount FROM envelopes WHERE category = $1', [category])
        if (envelope.rowCount < 1) {
            res.status(404).send('Envelope not found');
        } else if (parseInt(envelope.rows[0].amount) - amount < 0) {
            res.status(400).send('Insufficient funds in envelope');
        } else {
            // Update transaction in database
            const prevTransaction = await pool.query('SELECT envelope_id, amount FROM transactions WHERE id = $1', [id]);
            
            const results = await pool.query('UPDATE transactions SET envelope_id = $1, amount = $2, receipient = $3, date = $4 WHERE id = $5 RETURNING *',
                [envelope.rows[0].id, amount, receipient, date, id]);
            if (results.rowCount < 1) {
                res.status(404).send('Transaction not found');
            } else {
                // Update envelopes
                await pool.query('UPDATE envelopes SET amount = amount + $1 WHERE id = $2',
                    [parseInt(prevTransaction.rows[0].amount), prevTransaction.rows[0].envelope_id]);
                await pool.query('UPDATE envelopes SET amount = amount - $1 WHERE id = $2', 
                    [parseInt(amount), envelope.rows[0].id]);
                // Send response
                res.status(200).send(results.rows[0])
            }
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Delete transaction by ID (@delete /api/transactions/{id})
const deleteTransaction = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Validate ID
        const transaction = await pool.query('SELECT * FROM transactions WHERE id = $1', [id]);
        if (transaction.rowCount < 1) {
            res.status(404).send('Transaction not found');
        } else {
        // Update envelope
            const envelope = await pool.query('SELECT * FROM envelopes WHERE id = $1', [transaction.rows[0].envelope_id]);
            if (envelope.rowCount > 0) {
                await pool.query('UPDATE envelopes SET amount = amount + $1 WHERE id = $2', 
                    [transaction.rows[0].amount, envelope.rows[0].id]);
            }
        // Delete transaction
            await pool.query('DELETE FROM transactions WHERE id = $1', [id]);
            res.status(204).send('Transaction deleted');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = { getTransactions, makeTransaction, getTransaction, updateTransaction, deleteTransaction }