import React from 'react';
import './ReportDisplay.css';

function ReportDisplay({ reportData }) {
    if (!reportData) {
        return <div className="report-display">Отчет не найден. Пожалуйста, сформируйте отчет.</div>;
    }

    return (
        <div className="container">
            <div className="report-display">
                <h2>Отчет за период</h2>
                <div className="report-details">
                    <div className="report-section">
                        <h3>Доходы</h3>
                        <p>Общая сумма: {reportData.incomeTotal} руб.</p>
                    </div>
                    <div className="report-section">
                        <h3>Расходы</h3>
                        <p>Общая сумма: {reportData.expenseTotal} руб.</p>
                    </div>
                </div>
                <div className="report-summary">
                    <h3>Сводка</h3>
                    <p>Чистый доход: {reportData.netIncome} руб.</p>
                </div>
            </div>
        </div>
    );
}

export default ReportDisplay;
