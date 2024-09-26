import { useState, useEffect } from 'react';
import Web3 from 'web3';
import PropTypes from 'prop-types';
import { contractABI, contractAddress } from '../abi';

const VotePage = ({ account }) => {
    const [candidateId, setCandidateId] = useState(null);
    const [contract, setContract] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadContract = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
                setContract(contractInstance);
            } else {
                alert('Please install MetaMask to vote.');
            }
        };
        loadContract();
    }, []);

    const handleVote = async () => {
        if (!contract) {
            setMessage('Contract not loaded');
            return;
        }

        if (candidateId === null) {
            setMessage('Please select a candidate');
            return;
        }

        try {
            const gas = await contract.methods.vote(candidateId).estimateGas({ from: account });
            const result = await contract.methods.vote(candidateId).send({
                from: account,
                gas,
                value: Web3.utils.toWei('0.001', 'ether') // Small amount of gas fee
            });

            if (result) {
                setMessage('Vote successful!');
                // Optionally reset candidateId for new voting
                setCandidateId(null);
            }
        } catch (err) {
            if (err.message.includes("You have already voted.")) {
                setMessage('You have already voted for this candidate.');
            } else {
                setMessage('There was an error during voting. Please try again.');
            }
            console.error('Voting error:', err);
        }
    };

    const handleResetVote = async () => {
        if (!contract) {
            setMessage('Contract not loaded');
            return;
        }

        try {
            const gas = await contract.methods.resetVotingStatus().estimateGas({ from: account });
            const result = await contract.methods.resetVotingStatus().send({
                from: account,
                gas,
            });

            if (result) {
                setMessage('Voting status reset! You can vote again.');
                // Optionally reset candidateId for new voting
                setCandidateId(null);
            }
        } catch (err) {
            setMessage('There was an error resetting your voting status.');
            console.error('Reset error:', err);
        }
    };

    return (
        <div>
            <h2>Vote for Your Candidate</h2>
            <p>Connected Account: {account}</p>
            
            <div>
                <label>Select a Candidate:</label>
                <select onChange={(e) => setCandidateId(Number(e.target.value))}>
                    <option value="">Select</option>
                    <option value="1">Candidate 1</option>
                    <option value="2">Candidate 2</option>
                    {/* Add more candidates as needed */}
                </select>
            </div>

            <button onClick={handleVote}>Cast Vote</button>
            <button onClick={handleResetVote}>Reset Voting Status</button> {/* Button to reset voting status */}

            {message && <p>{message}</p>}
        </div>
    );
};

// Add PropTypes for validation
VotePage.propTypes = {
    account: PropTypes.string.isRequired,
};

export default VotePage;
