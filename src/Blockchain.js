// src/Blockchain.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Blockchain.css'; // Import a custom CSS file for styling

const Blockchain = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBlock, setExpandedBlock] = useState(null);

  useEffect(() => {
    const fetchBlockchain = async () => {
      try {
        const response = await axios.get('https://47a3-2409-4072-183-d9b2-b823-5a75-dae6-8eaa.ngrok-free.app/sync_blockchain', {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });
        const data = response.data;
        setBlocks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockchain();
  }, []);

  const toggleTransactionDetails = (index) => {
    setExpandedBlock(index === expandedBlock ? null : index);
  };

  const renderBlock = (block, index) => {
    const previousHash = block.previous_hash || 'N/A';
    const fingerprintHash = block.fingerPrintHash || 'N/A';
    const commitment = block.commitment || 'N/A';

    return (
      <div key={index} className="block-card">
        <h3 className="block-title">Block {index + 1}</h3>
        <div className="block-details">
          <p><strong>User ID:</strong> {block.userid || 'N/A'}</p>
          <p><strong>Previous Hash:</strong> {previousHash.length > 20 ? `${previousHash.slice(0, 20)}...` : previousHash}</p>
          {/* <p><strong>Fingerprint Hash:</strong> {fingerprintHash.length > 20 ? `${fingerprintHash.slice(0, 20)}...` : fingerprintHash}</p> */}
          <p><strong>Commitment:</strong> {commitment.length > 20 ? `${commitment.slice(0, 20)}...` : commitment}</p>
          <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
          <button className="btn" onClick={() => toggleTransactionDetails(index)}>
            {expandedBlock === index ? 'Hide Transaction' : 'View Transaction'}
          </button>
          {expandedBlock === index && (
            <div className="transaction-details">
              <pre>{JSON.stringify(block.transaction, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return <p>Loading blockchain data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="blockchain-container">
      <h2 className="title">Blockchain Data</h2>
      <div className="blockchain-grid">
        {blocks.map((block, index) => renderBlock(block, index))}
      </div>
    </div>
  );
};

export default Blockchain;
