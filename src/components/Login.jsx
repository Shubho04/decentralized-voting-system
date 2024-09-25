import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [aadhaarNumber, setAadhaarNumber] = useState(''); // Updated state variable name
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                aadhaarNumber, // Use aadhaarNumber here
                password
            });

            // Use the response object
            if (response.data && response.data.message) {
                setMessage(response.data.message);
                // Store token if present in response
                // localStorage.setItem('token', response.data.token); // Uncomment if using token
            }
        } catch (error) {
            setMessage(error.response?.data.message || 'Login failed'); // Use optional chaining to avoid errors
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Aadhaar Number"
                    value={aadhaarNumber} // Updated value here
                    onChange={(e) => setAadhaarNumber(e.target.value)} // Updated setter function
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
