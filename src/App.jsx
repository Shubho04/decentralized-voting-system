import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Register from './components/Register';
import Login from './components/Login';
import { contractABI, contractAddress } from './abi';
import './App.css'; // Custom CSS for styling
import './index.css';

const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [view, setView] = useState('home'); // Use state to switch between views

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);
      } else {
        alert('Please install MetaMask');
      }
    };

    loadWeb3();
  }, []);

  const castVote = async (candidateId) => {
    if (!contract) {
      alert('Contract not loaded');
      return;
    }

    try {
      await contract.methods.vote(candidateId).send({ from: account });
      console.log("Vote successful");
    } catch (err) {
      console.error("Voting error", err);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Decentralized Voting System</h1>
        <p className="account-info">Connected Account: <strong>{account ? account : 'Not Connected'}</strong></p>
      </header>

      {/* Navigation Menu using state */}
      <nav className="nav">
        <button className="nav-button" onClick={() => setView('home')}>Home</button>
        <button className="nav-button" onClick={() => setView('register')}>Register</button>
        <button className="nav-button" onClick={() => setView('login')}>Login</button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {view === 'home' && (
          <div className="home-page">
            <h2>Welcome to the Decentralized Voting System!</h2>
            <p>Please log in or register to vote for your candidate.</p>
            <div className="vote-buttons">
              <button className="vote-button" onClick={() => castVote(1)}>Vote for Candidate 1</button>
              <button className="vote-button" onClick={() => castVote(2)}>Vote for Candidate 2</button>
            </div>
          </div>
        )}
        {view === 'register' && <Register />}
        {view === 'login' && <Login />}
      </main>

      <footer className="footer">
        <p>Decentralized Voting System | Built on Ethereum Blockchain</p>
      </footer>
    </div>
  );
};

export default App;
