import React from 'react';
import './TransactionList.css'; // Импорт стилей для TransactionList

function TransactionList({ transactions = [] }) {
    return (
        <div className="transaction-list">
            <h2>Список транзакций</h2>
            <table>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Категория</th>
                    <th>Описание</th>
                </tr>
                </thead>
                <tbody>
                {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Нет транзакций</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionList;
