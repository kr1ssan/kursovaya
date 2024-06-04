import React from 'react';
import './Dashboard.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import TransactionList from './TransactionList';

// Регистрация компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
    const transactions = [
        { date: '30.05.2024', amount: '-2862446.40', category: 'Расход', description: 'Закупка товара' },
        { date: '29.05.2024', amount: '-17000.00', category: 'Расход', description: 'Оплата по счетам за транспортные услуги' },
        { date: '28.05.2024', amount: '+24826500.00', category: 'Приход', description: 'Оплата по договору за сахар' },
        { date: '27.05.2024', amount: '-50000.00', category: 'Расход', description: 'Оплата аренды офиса' },
        { date: '26.05.2024', amount: '+100000.00', category: 'Приход', description: 'Возврат аванса' },
        { date: '25.05.2024', amount: '-300000.00', category: 'Расход', description: 'Зарплата сотрудникам' },
        { date: '24.05.2024', amount: '-5000.00', category: 'Расход', description: 'Канцелярские товары' },
        { date: '23.05.2024', amount: '+1000000.00', category: 'Приход', description: 'Продажа товара' },
        { date: '22.05.2024', amount: '-150000.00', category: 'Расход', description: 'Оплата услуг IT' },
        { date: '21.05.2024', amount: '-25000.00', category: 'Расход', description: 'Реклама' }
    ];

    // Извлекаем значения amount для вертикальной оси
    const verticalData = transactions.map(transaction => parseFloat(transaction.amount));

    const lineChartData = {
        labels: transactions.map(transaction => transaction.date),
        datasets: [
            {
                label: 'Расходы',
                data: verticalData,
                fill: false,
                borderColor: '#ffcc00',
                tension: 0.1
            }
        ]
    };

    const lineChartOptions = {
        scales: {
            y: {
                beginAtZero: false // Начинать ось Y не с нуля
            }
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <button className="navbar-button">Составить отчет</button>
                <button className="navbar-button">Посмотреть отчет</button>
            </nav>
            <h1>Панель управления</h1>
            <div className="chart-container">
                <Line data={lineChartData} options={lineChartOptions} />
            </div>
            <div className="transaction-buttons">
                <button className="transaction-button">Добавить транзакцию</button>
                <button className="transaction-button">Редактировать транзакцию</button>
                <button className="transaction-button">Удалить транзакцию</button>
            </div>
            <TransactionList transactions={transactions} />
        </div>
    );
}

export default Dashboard;
