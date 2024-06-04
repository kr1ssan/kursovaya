import React, { useState } from 'react';
import './ReportForm.css';

function ReportForm({ onGenerateReport }) {
    const [dates, setDates] = useState({
        startDate: '',
        endDate: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDates(prevDates => ({
            ...prevDates,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onGenerateReport) {
            onGenerateReport(dates);
        }
    };

    return (
        <div className="container">
            <form className="report-form" onSubmit={handleSubmit}>
                <h2>Сформировать отчет</h2>
                <div className="form-control">
                    <label htmlFor="startDate">Начальная дата:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={dates.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="endDate">Конечная дата:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={dates.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Сформировать</button>
            </form>
        </div>
    );
}

export default ReportForm;
