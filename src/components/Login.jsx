import { useState } from 'react';

const Login = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for logging in user with Aadhaar and password
    console.log('Logging in with Aadhaar:', aadhaar, 'Password:', password);
  };

  return (
    <div>
      <h2>Voter Login</h2>
      <input
        type="text"
        placeholder="Aadhaar Number"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
