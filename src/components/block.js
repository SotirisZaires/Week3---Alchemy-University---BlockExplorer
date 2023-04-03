import React, { useEffect, useState } from 'react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockDetails() {
  const { blockNumber } = useParams();
  const [block, setBlock] = useState();
  console.log(blockNumber);
  useEffect(() => {
    async function getBlock() {
      try {
        const response = await alchemy.core.getBlockWithTransactions(parseInt(blockNumber));
        setBlock(response);
      } catch (error) {
        console.error(error);
      }
    }
    getBlock();
  }, [blockNumber]);

  if (!block) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div>
      <h2>Block Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Number:</td>
            <td>{block.number}</td>
          </tr>
          <tr>
            <td>Hash:</td>
            <td>{block.hash}</td>
          </tr>
          <tr>
            <td>Miner:</td>
            <td>{block.miner}</td>
          </tr>
          <tr>
            <td>Timestamp:</td>
            <td>{new Date(block.timestamp * 1000).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Difficulty:</td>
            <td>{block.difficulty}</td>
          </tr>
          <tr>
            <td>Gas Used:</td>
            <td>{block.gasUsed.toNumber()}</td>
          </tr>
          <tr>
            <td>Gas Limit:</td>
            <td>{block.gasLimit.toNumber()}</td>
          </tr>
          <tr>
            <td>Transactions:</td>
            <td>{block.transactions.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h3>Transactions List</h3>
      <table className='container'>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
      <tbody>
         {block.transactions.map((tx) => (
                <tr key={tx.hash}>
                    <Link to={`/tx/${tx.hash}`}>{tx.hash.slice(0, 20)}...</Link>
                    {/* <td>{tx.hash.slice(0,20)}...</td> */}
                    <td>{tx.from.slice(0,10)}...{tx.from.slice(-10)}</td>
                    <td>{tx.to.slice(0,10)}...{tx.to.slice(-10)}</td>
                    <td className='ethval'>{Math.floor(Utils.formatEther(tx.value)*10000)/10000} ETH</td>
                </tr>
                ))}
        </tbody>
        </table>
    </div>
    </div>
  );
}

export default BlockDetails;