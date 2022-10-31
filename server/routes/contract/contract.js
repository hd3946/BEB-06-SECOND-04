var express = require('express');
var router = express.Router();
require('dotenv').config();

var { User, Post } = require("../../models/index");

/* contract & wallet Addr */
const tokenAddr = process.env.TOKEN_CONTRACT_ADDRESS;
const nftAddr = process.env.NFT_CONTRACT_ADDRESS;
const serverAddr = process.env.SERVER_ADDRESS;        //가나슈1
const serverKey =  process.env.SERVER_PRIVATE_KEY;    //가나슈1 비밀키
// const userAddr = process.env.USER_ADDRESS           //가나슈2
// const userPassword = process.env.USER_PRIVATE_KEY       //생성된 지갑 비밀번호

/* web.eth */
var Web3 = require('web3');
var web3 = new Web3('http://localhost:7545');

/* Contract ABI setProvider */
const Contract = require('web3-eth-contract');
Contract.setProvider('http://localhost:7545');
const tokenABI = require('../../web3/tokenABI'); 
const tokenContract = new Contract(tokenABI, tokenAddr);
const nftABI = require('../../web3/nftABI');
const nftContract = new Contract(nftABI , nftAddr);



///////////////////////////////////////////////////////////////////////////

/* eth faucet */
router.post('/eth', async (req, res, next) => {  
  const eth = web3.utils.toWei("1") 
  const send = await web3.eth.sendTransaction({ //1이더 전송
    from: serverAddr,
    to: userAddr,
    value: eth
  })
  const weiBalance = await web3.eth.getBalance(userAddr)
  const ethBalance = web3.utils.fromWei(weiBalance)
  console.log(`transfer to userAddr:${userAddr} || 1 ETH.`)
  res.status(200).send({ ethBalance });
});



///////////////////////////////////////////////////////////////////////////

/* transfer token  */
router.post('/token', async (req, res, next) => {
  const transferToken = await tokenContract.methods.transfer(userAddr, 1).send({ from: serverAddr }) //from에게 token를 전송
  const tokenBalance = await tokenContract.methods.balanceOf(userAddr).call()
  console.log(`transfer to userAddr:${userAddr} || 1 Token.`)
  res.status(200).send({ tokenBalance });
});



///////////////////////////////////////////////////////////////////////////

/* mint NFT */
router.post('/mint', async (req, res, next) => {  

  /** account methods **/
  // const wallet = await web3.eth.personal.newAccount(userPassword) //지갑생성
  // const unlock = await web3.eth.personal.unlockAccount(userAddr, userPassword)

  /** Token methods **/
  // const tokenBalance = await tokenContract.methods.balanceOf(userAddr).call()
  // const tokenTransfer = await tokenContract.methods.transfer(serverAddr, 1).send({ from: userAddr })

  /** NFT methods **/
  // const nftMint = await nftContract.methods.mintNFT(serverAddr, "testURI").send({ from: serverAddr })
  // const nftBalance = await nftContract.methods.balanceOf(serverAddr ).call()
  // const nftTokenId = await nftContract.methods._tokenIds().call()

  ////////////////////////////////////////////////////////////////////////////

  try {
    const userAddr = req.cookies.loginData.address;
    if (!req.cookies.loginData.address) return res.status(401).json("로그인되어 있지 않습니다.");
    const tokenTransfer = await tokenContract.methods.transfer(serverAddr, 1).send({ from: userAddr });
    if (tokenTransfer) {
      const nftMint = await nftContract.methods.mintNFT(serverAddr, "testURI").send({ from: serverAddr });
      const nftTokenId = await nftContract.methods._tokenIds().call();
      const nftBalance = await nftContract.methods.balanceOf(serverAddr ).call();
      //tokenId를 데이터베이스에 저장

      return res.status(200).json({
        status: true,
        messege: "success",
        nftTokenId,
        nftBalance
      })
    }
  } catch (error) {
    next(error);
  } 
});

module.exports = router;
