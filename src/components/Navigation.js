import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css'

const Navigation = () => {
    let navigate = useNavigate();

    const goToHomepage = () => {
        navigate('/');
    };

    const goToRegister = () => {
        navigate('/register');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToTransactionForm = () => {
        navigate('/transaction-form');
    };

    const goToTransactionList = () => {
        navigate('/transaction-list');
    };

    const goToReportForm = () => {
        navigate('/report-form');
    };

    const goToReportDisplay = () => {
        navigate('/report-display');
    };

    return (
        <div className="navigation">
            <button onClick={goToHomepage}>Homepage</button>
            <button onClick={goToRegister}>Register</button>
            <button onClick={goToLogin}>Login</button>
            <button onClick={goToDashboard}>Dashboard</button>
            <button onClick={goToTransactionForm}>Transaction Form</button>
            <button onClick={goToTransactionList}>Transaction List</button>
            <button onClick={goToReportForm}>Report Form</button>
            <button onClick={goToReportDisplay}>Report Display</button>
        </div>
    );
};

export default Navigation;
