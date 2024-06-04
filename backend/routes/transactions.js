const express = require('express');
const pool = require('../db/db.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const transactions = await pool.query('SELECT * FROM transactions WHERE user_id = $1', [req.user.id]);
        res.json(transactions.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve transactions.',
            detail: error.message
        });
    }
});

router.post('/', async (req, res) => {
    const { amount, date, category, description, user_id } = req.body;
    try {
        const newTransaction = await pool.query(
            'INSERT INTO transactions (amount, date, category, description, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [amount, date, category, description, user_id]
        );
        res.status(201).json(newTransaction.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: 'Error adding new transaction',
            detail: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, date, category, description } = req.body;
    try {
        const updatedTransaction = await pool.query(
            'UPDATE transactions SET amount = $1, date = $2, category = $3, description = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
            [amount, date, category, description, id, req.user.id]
        );
        if (updatedTransaction.rows.length === 0) {
            return res.status(404).json({ message: 'Transaction not found or user not authorized' });
        }
        res.json(updatedTransaction.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating transaction',
            detail: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteOp = await pool.query('DELETE FROM transactions WHERE id = $1 AND user_id = $2', [id, req.user.id]);
        if (deleteOp.rowCount === 0) {
            return res.status(404).json({ message: 'Transaction not found or user not authorized' });
        }
        res.json({ message: 'Transaction deleted successfully.' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting transaction',
            detail: error.message
        });
    }
});

module.exports = router;
