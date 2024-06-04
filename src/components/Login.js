import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/Dashboard');
            } else {
                setError(data.message || 'Ошибка авторизации');
            }
        } catch (err) {
            setError('Не удалось выполнить запрос. Пожалуйста, проверьте ваше соединение.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Вход</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Введите логин"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Войти</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                <p className="register-redirect">
                    Нет аккаунта? <a href="/register">Зарегистрироваться</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
