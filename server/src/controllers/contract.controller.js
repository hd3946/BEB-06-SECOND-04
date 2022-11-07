import ganache from "../web3/web3.js";
import { imgUpload, jsonUpload } from "../web3/ipfs.js";
import { db, sequelize } from "../models/index.js";
const { User, Post, Comment, PostLike, CommentLike, Token } = db;

/* transfer token  */
const transfer = async (req, res, next) => {
  try {
    const userAddr = req.cookies.loginData.address;
    const { address, balance } = req.body; 
    const tokenBalance = await ganache.getTokenBalance(userAddr);
    if(tokenBalance >= Number(balance)) {
      const transferToken = await ganache.tradeToken(userAddr, address, balance);
      const refreshTokenBalance = await ganache.getTokenBalance(userAddr);
      return res.status(200).json({ 
        status: true,
        message: `transfer to userAddr:${address} || ${balance} Token.`,
        tokenBalance: refreshTokenBalance,
        transactionHash: transferToken.transactionHash
      });
    } else {
      return res.status(401).json({ 
        status: false,
        message: `Not enough Token`,
        tokenBalance,
      })
    } 
  } catch (err) {
    next(err);
  }
};

const myNFT = async (req, res, next) => {
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
      message: "search my NFT",
      myToken,
    });
  } catch (err) {
    next(err);
  }
};

/* mint NFT */
const mint = async (req, res, next) => {
  try {
    const { id, address } = req.cookies.loginData;
    const { name, description, attributes } = req.body;
    const file = req.file;

    const tokenBalance = await ganache.getTokenBalance(address);
    console.log("보유중인 토큰", tokenBalance);
    if (tokenBalance > 0) {
      const imgURI = await imgUpload(file ? file.buffer : file);
      console.log("imgURI", imgURI)
      const details = {
        name: name,
        description: description,
        image: imgURI,
        attributes: attributes,
      };
      const jsonData = JSON.stringify(details);
      const tokenURI = await jsonUpload(jsonData);
      const tokenTransfer = await ganache.receiveToken(address, 1); //1개로 교환가능
      const nftMint = await ganache.nftMinting(address, tokenURI);
      const nftTokenId = await ganache.getNftTokenId();
      const nftBalance = await ganache.getNftBalance(address);
      const refreshTokenBalance = await ganache.getTokenBalance(address);
      await Token.create({
        tokenId: nftTokenId,
        userId: id,
      });
      return res.status(200).json({
        status: true,
        message: "success",
        nftTokenId,
        nftBalance,
        tokenBalance: refreshTokenBalance,
        transactionHash: nftMint.transactionHash
      });
    } else {
      const tokenTransfer = await ganache.giveContribution(address, 10); //test용
      return res.status(401).json({
        status: false,
        message: "Not enough tokens",
        tokenBalance,
      });
    }
  } catch (err) {
    next(err);
  }
};

export { transfer, myNFT, mint };