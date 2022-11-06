import Web3 from "web3";
import Contract from "web3-eth-contract";
import dotenv from "dotenv";
import tokenABI from "./tokenABI.js";
import nftABI from "./nftABI.js";
import axios from "axios";
dotenv.config();

/* contract & wallet Addr */
const tokenAddr = process.env.TOKEN_CONTRACT_ADDRESS;
const nftAddr = process.env.NFT_CONTRACT_ADDRESS;
const serverAddr = process.env.SERVER_ADDRESS; //가나슈1
const serverKey = process.env.SERVER_PRIVATE_KEY; //가나슈1 비밀키
const userAddr = process.env.USER_ADDRESS; //가나슈2
const userPassword = process.env.USER_PRIVATE_KEY; //가나슈2 비밀키

/* setProvider & ABI */
const web3 = new Web3("http://localhost:7545");
Contract.setProvider("http://localhost:7545");
const tokenContract = new Contract(tokenABI, tokenAddr);
const nftContract = new Contract(nftABI, nftAddr);

const ganache = {};

/* ETH */
const getEthBalance = async (address) => {
  const weiBalance = await web3.eth.getBalance(address);
  const ethBalance = web3.utils.fromWei(weiBalance);
  return ethBalance;
};

/* Token */
const getTokenBalance = async (address) => {
  const tokenBalance = await tokenContract.methods.balanceOf(address).call();
  return tokenBalance;
};

const giveContribution = async (address, number) => {
  //토큰을 전송
  const transferToken = await tokenContract.methods
    .transfer(address, number)
    .send({ from: serverAddr });
  return transferToken;
};

const receiveToken = async (address, number) => {
  //토큰을 받는다
  const tokenTransfer = await tokenContract.methods
    .transfer(serverAddr, number)
    .send({ from: address });
  return tokenTransfer;
};

const tradeToken = async (fromAddr, toAddr, number) => {
  //토큰을 전송
  const transferToken = await tokenContract.methods
    .transfer(toAddr, number)
    .send({ from: fromAddr });
  return transferToken;
};

/* NFT */
const getNftBalance = async (address) => {
  const nftBalance = await nftContract.methods.balanceOf(address).call();
  return nftBalance;
};

const getNftTokenId = async () => {
  //가장 최근에 만들어진 tokenId값
  const nftTokenId = await nftContract.methods._tokenIds().call();
  return nftTokenId;
};

const nftMinting = async (address, tokenURI) => {
  console.log("NFT가 발행중입니다");
  console.log("User", address);
  console.log("tokenURI", tokenURI);

  const nftMint = await nftContract.methods
    .mintNFT(address, tokenURI)
    .send({ from: serverAddr, gasLimit: 200000 });
  return nftMint;
};

const getMetaData = async (tokenId) => {
  const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
  const metaData = await axios({
    method: "GET",
    url: tokenURI,
    headers: { accept: "application/json" },
    withCredential: true,
  });
  return metaData;
};

ganache.getEthBalance = getEthBalance;

ganache.getTokenBalance = getTokenBalance;
ganache.giveContribution = giveContribution;
ganache.receiveToken = receiveToken;
ganache.tradeToken = tradeToken;

ganache.getNftBalance = getNftBalance;
ganache.getNftTokenId = getNftTokenId;
ganache.nftMinting = nftMinting;
ganache.getMetaData = getMetaData;

export default ganache;
