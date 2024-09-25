import { useState } from 'react';

const Register = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Logic for registering user with Aadhaar and password
    console.log('Registering with Aadhaar:', aadhaar, 'Password:', password);
  };

  return (
    <div>
      <h2>Voter Registration</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
