import { db } from "../models/index.js";
const { User } = db;
import jwt from "jsonwebtoken";
import ganache from "../web3/web3.js";
const { getEthBalance, getTokenBalance, getNftBalance } = ganache;
import { imgUpload } from "../web3/ipfs.js";
import {
  getUserData,
  createUser,
  getUserPost,
  updateUser,
} from "../services/user.service.js";

//POST 로그인 /signin
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password))
    return res.status(401).json("입력정보가 부족합니다");
  try {
    const userData = await (await getUserData(email, password)).toJSON();
    delete userData.password; //비밀번호 삭제
    delete userData.deletedAt;
    const loginData = jwt.sign(userData, process.env.ACCESS_SECRET);
    res.cookie("loginData", loginData, {
      maxAge: 3 * 60 * 60 * 1000, //3시간유효
      httpOnly: false,
    }); 
    console.log("로그인 성공");
    return res.status(200).json({
      status: true,
      message: `${userData.nickname} is login Success`,
    });
  } catch (err) {
    console.log("로그인 실패");
    return res.status(401).json("아이디 또는 비밀번호가 잘못되었습니다."); //deletedAt에 날짜 입력되면 에러처리됨
  }
};

// POST 로그아웃 /signout
const signout = (req, res, next) => {
  res.cookie("loginData", null, { maxAge: 0, httpOnly: true }); //쿠키삭제
  console.log("로그아웃되었습니다");
  return res.status(200).json("logout ok");
};

// POST 회원 가입 /signup
const signup = async function (req, res, next) {
  const { email, password, nickname, address } = req.body;
  console.log("signup 실행 데이터 체크", email, password, nickname, address);

  if (!(email && password && nickname && address))
    return res.status(401).json("입력정보가 부족합니다");

  try {
    //const hash = await bcrypt.hash(password, 10);
    const makeUser = await createUser(email, password, nickname, address);

    return res.status(200).json({
      status: true,
      message: `user: ${nickname} is Signup Success`,
    });
  } catch (err) {
    next(err);
  }
};

//get 유저정보 조회 /info
const info = async (req, res, next) => {
  const loginData = req.cookies.loginData;
  console.log(loginData)
  const { id, address } = loginData;
  try {
    const postList = await getUserPost(id);
    const ethBalance = await getEthBalance(address);
    const tokenBalance = await getTokenBalance(address);
    const nftBalance = await getNftBalance(address);
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
    return res.status(400).json({
      status: false,
      message: "유저정보 검색이 실패하였습니다",
    });
  }
};

//POST 회원정보 수정 /edit upload.single("avatar")
const edit = async (req, res, next) => {
  try {
    console.log("프로필 이미지 업로드", req.file);
    const profileUrl = await imgUpload(req.file ? req.file.buffer : req.file);
    const loginData = req.cookies.loginData;
    const { id } = loginData;
    const result = await updateUser(profileUrl, id);

    console.log("결과", result);

    if (result) {
      return res.status(200).json({
        status: true,
        message: "My-profile",
      });
    } else {
      return res.status(400).json({
        status: false,
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// POST follow 기능 /follow/:id
const follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      return res.send("success");
    } else {
      return res.status(404).send("no user");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export { signin, signout, signup, info, edit, follow };
