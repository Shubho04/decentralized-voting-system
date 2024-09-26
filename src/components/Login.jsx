import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes for validation

const Login = ({ setLoggedIn, setView }) => {
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                aadhaarNumber,
                password
            });

            // If login is successful
            if (response.data && response.data.message === 'Login successful') {
                setMessage('Login successful!');
                setLoggedIn(true);  // Update the login status
                setView('vote');    // Redirect to vote page after successful login
                
                // Optionally clear input fields
                setAadhaarNumber('');
                setPassword('');
            } else {
                setMessage(response.data.message || 'Login failed');
            }
        } catch (error) {
            setMessage(error.response?.data.message || 'Login failed');
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Aadhaar Number"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
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

// Add PropTypes validation to ensure that setLoggedIn and setView are required functions
Login.propTypes = {
    setLoggedIn: PropTypes.func.isRequired, // Validate that setLoggedIn is a function
    setView: PropTypes.func.isRequired,     // Validate that setView is a function
};

export default Login;
