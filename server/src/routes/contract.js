import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';
import ganache from '../web3/web3.js'
import upload from "./upload.js";
import ipfsUpload from "../web3/ipfs.js";
dotenv.config();

/* contract & wallet Addr */
const tokenAddr = process.env.TOKEN_CONTRACT_ADDRESS;
const nftAddr = process.env.NFT_CONTRACT_ADDRESS;
const serverAddr = process.env.SERVER_ADDRESS; //가나슈1
const serverKey = process.env.SERVER_PRIVATE_KEY; //가나슈1 비밀키
// const userAddr = process.env.USER_ADDRESS           //가나슈2
const userPassword = process.env.USER_PRIVATE_KEY       //생성된 지갑 비밀번호

/* web.eth */
import Web3  from 'web3';
const web3 = new Web3('http://localhost:7545');

/* Contract ABI setProvider */
import Contract from 'web3-eth-contract';
Contract.setProvider('http://localhost:7545');
import tokenABI from '../web3/tokenABI.js'; 
const tokenContract = new Contract(tokenABI, tokenAddr);
import nftABI from '../web3/nftABI.js';
const nftContract = new Contract(nftABI , nftAddr);



///////////////////////////////////////////////////////////////////////////

/* eth faucet */
router.post("/eth", async (req, res, next) => {
  const eth = web3.utils.toWei("1");
  const send = await web3.eth.sendTransaction({
    //1이더 전송
    from: serverAddr,
    to: userAddr,
    value: eth,
  });
  const weiBalance = await web3.eth.getBalance(userAddr);
  const ethBalance = web3.utils.fromWei(weiBalance);
  console.log(`transfer to userAddr:${userAddr} || 1 ETH.`);
  res.status(200).send({ ethBalance });
});

///////////////////////////////////////////////////////////////////////////

/* transfer token  */
router.post("/token", async (req, res, next) => {
  const transferToken = await tokenContract.methods
    .transfer(userAddr, 1)
    .send({ from: serverAddr }); //from에게 token를 전송
  const tokenBalance = await tokenContract.methods.balanceOf(userAddr).call();
  console.log(`transfer to userAddr:${userAddr} || 1 Token.`);
  res.status(200).send({ tokenBalance });
});

///////////////////////////////////////////////////////////////////////////

/* mint NFT */
router.post("/mint", async (req, res, next) => {
  if (!req.cookies.loginData)
    return res.status(401).json("로그인되어 있지 않습니다.");
  try {
    const userAddr = req.cookies.loginData.address;
    const { name, description, attributes } = req.body;
    const tokenBalance = await ganache.getTokenBalance(userAddr);
    console.log("보유중인 토큰", tokenBalance)
    if (tokenBalance > 0) {
      const details = { name, description , attributes , image: "image" }
      const tokenURI = await ipfsUpload(JSON.stringify(details));
      const tokenTransfer = await ganache.receiveToken(userAddr, 1); //1개로 교환가능
      const nftMint = await ganache.nftMinting(userAddr, tokenURI);
      const nftTokenId = await ganache.getNftTokenId();
      const nftBalance = await ganache.getNftBalance(userAddr);
      const resfreshTokenBalance = await ganache.getTokenBalance(userAddr);
      //tokenId를 데이터베이스에 저장

      return res.status(200).json({
        status: true,
        messege: "success",
        nftTokenId,
        nftBalance,
        tokenBalance: resfreshTokenBalance,
      });
    } else {
      return res.status(401).json({
      status: false,
      messege: "Not enough tokens",
      tokenBalance,
      });
     }
  } catch (error) {
    next(error);
  }
});
 
export default router;
