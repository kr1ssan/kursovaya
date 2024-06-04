import React, { useState } from 'react';
import './TransactionForm.css';

const TransactionForm = ({ addTransaction }) => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction({ date, amount, description, status });
        setDate('');
        setAmount('');
        setDescription('');
        setStatus('');
    };

    return (
        <div className="transaction-form-container">
            <form className="transaction-form" onSubmit={handleSubmit}>
                <h2>Добавить транзакцию</h2>
                <label htmlFor="date">Дата</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor="amount">Сумма</label>
                <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="description">Описание</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="status">Статус</label>
                <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default TransactionForm;
