import React from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    let navigate = useNavigate();

    const goToRegister = () => {
        navigate('/register');
    };


    const goToLogin = () => {
        navigate('/login');
    };

    const goToNav = () => {
        navigate('/navigate')
    }

    return (
        <div className="homepage">
            <nav className="navbar">
                <div className="navbar-links">
                    <a href="/navigate">///</a>
                </div>
                <button className="btn-secondary" onClick={goToLogin}>Войти</button>
            </nav>
            <header className="header-content">
                <h1 className="main-title">Финансовый помощник</h1>
                <p className="main-subtitle" >Простой и безопасный способ управления финансами</p>
                <div className="buttons">
                    <button className="btn-main" onClick={goToRegister}>Зарегистрироваться</button>
                </div>
            </header>
        </div>
    );
};

export default Homepage;
