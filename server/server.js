const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Web3 = require('web3');
const SupplyChain = require('../build/contracts/SupplyChain.json');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// const provider = new Web3.providers.HttpProvider("http://localhost:8545");
// const web3 = new Web3(provider);
// const contractAddress = '0x5FC9887AebbC69280f29290aEA191c3811a7A7A5';
// const contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);

app.use(express.json());
app.use(cors());


// Routes
app.use('/api/parcels', require('./routes'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));