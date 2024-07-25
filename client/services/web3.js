// import Web3 from 'web3';

// let web3;

// if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
//   // We are in the browser and metamask is running.
//   window.ethereum.request({ method: 'eth_requestAccounts' });
//   web3 = new Web3(window.ethereum);
// } else {
//   // We are on the server *OR* the user is not running metamask
//   const provider = new Web3.providers.HttpProvider(
//     'http://127.0.0.1:7545'
//   );
//   web3 = new Web3(provider);
// }

// export default web3;




import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' });
} else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(provider);
}

export default web3;

