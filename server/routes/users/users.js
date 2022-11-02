import express from 'express';
import bcrypt from 'bcrypt';

const nftAddr = process.env.NFT_CONTRACT_ADDRESS;
const tokenAddr = process.env.TOKEN_CONTRACT_ADDRESS;
const serverAddr = process.env.SERVER_ADDRESS; //가나슈1

import Web3 from "web3";
const web3 = new Web3("http://localhost:7545");
import Contract from "web3-eth-contract";
Contract.setProvider("http://localhost:7545");
import tokenABI from "../../web3/tokenABI.js";
const tokenContract = new Contract(tokenABI, tokenAddr);
import nftABI from "../../web3/nftABI.js";
const nftContract = new Contract(nftABI, nftAddr);

const router = express.Router();
import { db } from '../../models/index.js';
const { User, Post, Comment } = db;
import upload from '../post/upload.js';

/* users router listing. */
router.post("/signup", async (req, res, next) => {
  console.log("회원가입 API signup 실행");

  const { email, password, nickname, address } = req.body;
  console.log("데이터 체크", email, password, nickname, address);

  if (!(email && password && nickname && address))
    return res.status(401).json("입력정보가 부족합니다");

  try { 
    //const hash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      nickname,
      password,
      address,
    });

    res.status(200).json({
      status: true,
      message: `user: ${nickname} is Signup Success`,
      //token: token,  보류
    });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(401).json("입력정보가 부족합니다");
  try {
    const data = await User.findOne({
      where: { email, password },
    });
   
    const userData = data;
    delete userData.password; //비밀번호 삭제
    delete userData.deletedAt;
    res.cookie("loginData", userData, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: false,
    }); //3시간유효
    console.log("로그인 성공");
    return res.status(200).json({
      status: true,
      message: `${userData.nickname} is login Success`,
    });
  } catch (err) {
    console.log("로그인 실패");
    return res.status(401).json("아이디 또는 비밀번호가 잘못되었습니다."); //deletedAt에 날짜 입력되면 에러처리됨
  }
});

router.post("/signout", (req, res, next) => {
  res.cookie("loginData", null, { maxAge: 0, httpOnly: true }); //쿠키삭제
  console.log("로그아웃되었습니다");
  return res.status(200).json("logout ok");
});

//유저정보 조회
router.get("/info", async (req, res, next) => {
  if (!req.cookies.loginData)
    return res.status(401).json({
      status: false,
      message: "로그인이 필요합니다.",
    });
  const loginData = req.cookies.loginData;
  const { id, address } = loginData;
  try {
    const postList = await Post.findAll({
      include: 
      [
        { model: User, 
          attributes: ['email', 'nickname'] 
        },
        { model: Comment,
          attributes: [['id', 'commentId'], 'content', 'createdAt', 'updatedAt', 'commenter', 'postId'], 
          include: 
          { model: User, 
            attributes: ['email', 'nickname'] 
          }
        }
      ],
      attributes: [
        ["id", "postId"],
        "title",
        "content",
        "img",
        "createdAt",
        "updatedAt",
      ],
      where: { userId: id },
    });
    const weiBalance = await web3.eth.getBalance(address);
    const ethBalance = web3.utils.fromWei(weiBalance);
    const tokenBalance = await tokenContract.methods.balanceOf(address).call();
    const nftBalance = await nftContract.methods.balanceOf(address).call();
    return res.status(200).json({
      status: true,
      message: "유저정보 검색",
      loginData,
      ethBalance,
      tokenBalance,
      nftBalance,
      postList, //나의 게시글목록
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 유저 프로필이미지 넣기
router.post("/img", upload.single("avatar"), async (req, res, next) => {
  try {
    console.log("프로필 이미지 업로드", req.file.location, req.user.id);
    const profileurl = req.file.location;

    const result = await User.update(
      {
        profileurl,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    console.log("결과", result);

    if (result) {
      return res.status(200).json({
        status: true,
        message: "My-profile",
      });
    } else {
      return res.status(200).json({
        status: false,
      });
    }
  } catch (err) {
    console.error(err);
    next();
  }
});

//회원정보 수정
// router.post('/', function(req, res, next) {
//   res.send('here is users router');
// });
 
export default router;