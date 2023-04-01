import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import React from "react";
import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestTxs, setLatestTxs] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      let response = await alchemy.core.getBlockNumber();
      setBlockNumber(response);
    }
    async function getLatestBlocks() {
        let blocksTemp = [];
        //let blockNumber = await alchemy.core.getBlockNumber();
        for (let i = blockNumber; i > blockNumber - 10; i--) {
            const block = await alchemy.core.getBlock(i);
            blocksTemp.push(block);
          }
        setLatestBlocks(blocksTemp);
    }
    async function getLatestTransactions() {
       //let blockNumber = await alchemy.core.getBlockNumber();
        const block = await alchemy.core.getBlockWithTransactions(blockNumber);
        setLatestTxs(block.transactions.slice(0,10));
    }
    getBlockNumber();
    getLatestBlocks();
    getLatestTransactions()
  }, [blockNumber]);

  return(
    <div className='app'>
    <header className='App-header'>MyEtherScan</header>
        <main>
        <table className='container'>
            <thead>
                <tr>
                    <th>Block</th>
                    <th>Hash</th>
                    <th>Miner</th>
                    <th>Txs</th>
                </tr>
            </thead>
            <tbody>
                {latestBlocks.map((block) => (
                <tr key={block.number}>
                    <td className='numberB'>{block.number}</td>
                    <td>{block.hash.slice(0,10)}...{block.hash.slice(-10)}</td>
                    <td>{block.miner.slice(0,15)}...</td>
                    <td>{block.transactions.length}</td>
                </tr>
                ))}
            </tbody>
        </table>
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
                {latestTxs.map((tx) => (
                <tr key={tx.hash}>
                    <td>{tx.hash.slice(0,20)}</td>
                    <td>{tx.from.slice(0,10)}...{tx.from.slice(-10)}</td>
                    <td>{tx.to.slice(0,10)}...{tx.to.slice(-10)}</td>
                    <td className='ethval'>{Math.floor(Utils.formatEther(tx.value)*10000)/10000} ETH</td>
                </tr>
                ))}
            </tbody>
        </table>
        </main>
        <div className='diva'>

        </div>
    </div>
  );
}

export default App;