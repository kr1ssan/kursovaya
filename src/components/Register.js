import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});


    const validate = () => {
        let tempErrors = {};
        tempErrors.username = formData.username ? "" : "This field is required.";
        tempErrors.email = formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) ? "" : "Email is not valid.";
        tempErrors.password = formData.password.length > 6 ? "" : "Password must be at least 6 characters long.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    const data = await response.json();
                    navigate('/login');  // Redirect to login page after successful registration
                } else {
                    const errorData = await response.json();
                    setErrors({ ...errors, server: errorData.message });
                }
            } catch (error) {
                setErrors({ ...errors, server: 'Не удалось выполнить запрос. Пожалуйста, проверьте ваше соединение.' });
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Создать аккаунт</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Введите логин"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Введите почту"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Зарегистрироваться</button>
                </form>
                <p className="login-redirect">
                    Есть аккаунт? <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>Войти</button>
                </p>
            </div>
            {errors.server && <div className="server-error-message"><p>{errors.server}</p></div>}
        </div>
    );
}

export default Register;
