import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import ganache from "../web3/web3.js";
import upload from "./upload.js";
import ipfsUpload from "../web3/ipfs.js";
dotenv.config();

import { db, sequelize } from "../models/index.js";
const { User, Post, Comment, PostLike, CommentLike, Token } = db;

/* contract & wallet Addr */
const tokenAddr = process.env.TOKEN_CONTRACT_ADDRESS;
const nftAddr = process.env.NFT_CONTRACT_ADDRESS;
const serverAddr = process.env.SERVER_ADDRESS; //가나슈1
const serverKey = process.env.SERVER_PRIVATE_KEY; //가나슈1 비밀키
// const userAddr = process.env.USER_ADDRESS           //가나슈2
const userPassword = process.env.USER_PRIVATE_KEY; //생성된 지갑 비밀번호

/* web.eth */
import Web3 from "web3";
const web3 = new Web3("http://localhost:7545");

/* Contract ABI setProvider */
import Contract from "web3-eth-contract";
Contract.setProvider("http://localhost:7545");
import tokenABI from "../web3/tokenABI.js";
const tokenContract = new Contract(tokenABI, tokenAddr);
import nftABI from "../web3/nftABI.js";
const nftContract = new Contract(nftABI, nftAddr);


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

router.get("/mynft", upload.single('image'), async (req, res, next) => {
  if (!req.cookies.loginData)
    return res.status(401).json("로그인되어 있지 않습니다.");
  try {
    const { id } = req.cookies.loginData;
    const find = await Token.findAll({ userId: id});
    let myToken = [];
    for ( const data of find ) {
      myToken.push({tokenId: data.toJSON().tokenId});
    }
    for ( const obj of myToken ) {
      const metaData = await ganache.getMetaData(obj.tokenId);
      obj.metaData = metaData.data;
    } 
    return res.status(200).json({
      status: true,
      messege: "search my NFT",
      myToken,
    });
  } catch (err) {
    next(err);
  }  
});

/* mint NFT */
router.post("/mint", upload.single('image'), async (req, res, next) => {
  if (!req.cookies.loginData)
    return res.status(401).json("로그인되어 있지 않습니다.");
  try {
    const { id, address } = req.cookies.loginData;
    const { name, description, attributes } = req.body;
    const file = req.file;

    const tokenBalance = await ganache.getTokenBalance(address);
    console.log("보유중인 토큰", tokenBalance);
    if (tokenBalance > 0) {
      const imgURI = await ipfsUpload(file ? file.buffer : "empty");
      console.log("imgURI", imgURI)
      const details = {
        name: name,
        description: description,
        image: imgURI,
        attributes: attributes,
      };
      const jsonData = JSON.stringify(details);
      const tokenURI = await ipfsUpload(jsonData);
      const tokenTransfer = await ganache.receiveToken(address, 1); //1개로 교환가능
      const nftMint = await ganache.nftMinting(address, tokenURI);
      const nftTokenId = await ganache.getNftTokenId();
      const nftBalance = await ganache.getNftBalance(address);
      const resfreshTokenBalance = await ganache.getTokenBalance(address);
      await Token.create({
        tokenId: nftTokenId,
        userId: id,
      });
      return res.status(200).json({
        status: true,
        messege: "success",
        nftTokenId,
        nftBalance,
        tokenBalance: resfreshTokenBalance,
      });
    } else {
      const tokenTransfer = await ganache.giveContribution(address, 10); //test용
      return res.status(401).json({
        status: false,
        messege: "Not enough tokens",
        tokenBalance,
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
