import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [aadhaarNumber, setAadhaarNumber] = useState(''); // Updated state variable name
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                aadhaarNumber, // Updated key name here
                password
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || 'Registration failed'); // Fallback message
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
