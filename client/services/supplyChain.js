import web3 from './web3';
import SupplyChain from '../../build/contracts/SupplyChain.json';


const contractAddress = '0x5544F063d3C0C8A539a84A25f283D4E0F231D579'; // Address of deployed contract
const instance = new web3.eth.Contract(
  SupplyChain.abi,
  contractAddress
);

export default instance;
