import React, { useEffect, useState } from 'react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useParams } from 'react-router-dom';
import '../App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TxDetails() {
    const {hash: txHash } = useParams();
    const [tx, setTx] = useState();
    console.log(txHash);
  
    useEffect(() => {
      async function getTransaction() {
        try {
            const response = await alchemy.core.getTransactionReceipt(txHash);
            setTx(response);
          } catch (error) {
            console.error(error);
          }
      }
      getTransaction();
    }, [txHash]);
  
    if (!tx) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Transaction Details</h2>
        <table>
          <tbody>
            <tr>
              <td>Hash:</td>
              <td>{tx.transactionHash}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{tx.status}</td>
            </tr>
            <tr>
              <td>Block Number:</td>
              <td>{tx.blockNumber}</td>
            </tr>
            <tr>
              <td>From:</td>
              <td>{tx.from}</td>
            </tr>
            <tr>
              <td>To:</td>
              <td>{tx.to}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TxDetails;