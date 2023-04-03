import React, { useEffect, useState } from 'react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useParams } from 'react-router-dom';
import '../App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function AccountDetails() {
    const {hash: txHash } = useParams();
    const [accountBalance, setAccountBalance] = useState();
    console.log(txHash);
  
    useEffect(() => {
      async function getBalance() {
        try {
            const response = await alchemy.core.getBalance(txHash);
            setAccountBalance(response);
          } catch (error) {
            console.error(error);
          }
      }
      getBalance();
    }, [txHash]);
  
    if (!accountBalance) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Account Details</h2>
        <table>
          <tbody>
            <tr>
              <td>Hash:</td>
              <td>{txHash}</td>
            </tr>
            <tr>
              <td>Balance:</td>
              <td>{Utils.formatEther(accountBalance)} ETH</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default AccountDetails;