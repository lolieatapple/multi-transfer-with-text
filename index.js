const { ethers } = require("ethers");
const fs = require('fs');
require('dotenv').config()

const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
const wallet = new ethers.Wallet(process.env.PK, provider);
const file = '/Users/molin/Downloads/test.csv';

async function main() {
  console.log('from', wallet.address);
  let nonce = await wallet.getTransactionCount();
  console.log('balance', await wallet.getBalance(), nonce);
  const content = fs.readFileSync(file, 'utf-8');
  const addrs = content.split('\n').map(v=>v.replace('\r','')).map(v=>v.toLowerCase().trim());
  console.log('addrs', addrs);

  for (let i=0; i<addrs.length; i++) {
    let uint8array = new TextEncoder("utf-8").encode("Wanchain");
    let tx = {to: addrs[i], value: 0, data: uint8array, nonce: nonce + i};
    console.log('tx', tx);
    let ret = await wallet.sendTransaction(tx);
    console.log('txHash', i, ret.hash);
  }
}

main().then(console.log).catch(console.log);
