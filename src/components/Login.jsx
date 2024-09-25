import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [aadhaar, setAadhaar] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                aadhaar,
                password
            });
            setMessage('Login successful!');
            localStorage.setItem('token', response.data.token); // Store token for further requests
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Aadhaar Number"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
