const express = require('express'),
    router = express.Router();

const { getTransactions, 
        makeTransaction, 
        getTransaction, 
        updateTransaction, 
        deleteTransaction } = require('../controllers/transactions');

// Get all transactions
router.get('/', getTransactions);
// Add new transaction
router.post('/', makeTransaction);
// Get transaction by ID
router.get('/:id', getTransaction);+
// Update transaction by ID
router.put('/:id', updateTransaction);
// Delete transaction by ID
router.delete('/:id', deleteTransaction);

module.exports = router;