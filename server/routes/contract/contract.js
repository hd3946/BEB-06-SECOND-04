var express = require('express');
var router = express.Router();
require('dotenv').config();

const contractAddr = process.env.ERC20_CONTRACT_ADDRESS
const serverAddr = process.env.SERVER_ADDRESS;
const transferTo = process.env.DUMMY_ADDRESS;

router.post('/eth', async (req, res, next) => {
  res.send('here is contract/eth router');
});

/* transfer router listing. */
router.post('/token', async (req, res, next) => {
  // const abi = require('../../web3/ABI');
  const ERC20abi = require('../../web3/ERC20');
  const Contract = require('web3-eth-contract');
  Contract.setProvider('http://localhost:7545')
  const contract = new Contract(ERC20abi, contractAddr);

  const result = await contract.methods.transfer(transferTo, 1).send({from: serverAddr})
  const balance = await contract.methods.balanceOf(serverAddr).call()
  
  console.log(result)
  console.log(balance)
  res.send('here is contract/token router');
});

router.post('/mint', async (req, res, next) => {
  res.send('here is contract/mint router');
});


module.exports = router;
