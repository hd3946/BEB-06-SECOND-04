var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");

var { User, Post } = require("../../models/index");
var { upload } = require("../post/upload");
var { isLoggedIn } = require("../middlewares");

/* users router listing. */
router.post("/signup", async (req, res, next) => {
  console.log("회원가입 API signup 실행");

  const { email, password, nickname, address } = req.body;
  console.log("데이터 체크", email, password, nickname, address);

  if (!(email && password && nickname && address))
    return res.status(401).json("입력정보가 부족합니다");

  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser)
      return res
        .status(401)
        .json("Authentication failed. 사용자 이미 존재합니다.");
    const hash = await bcrypt.hash(password, 10);

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

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(401).json("입력정보가 부족합니다");
  try {
    const data = await User.findOne({
      where: { email, password },
    });

    const userData = data.toJSON();
    delete userData.password; //비밀번호 삭제
    delete userData.deletedAt;
    res.cookie("loginData", userData, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true,
    }); //3시간유효
    console.log("로그인 성공");
    const userPost = await Post.findAll({ where: { userId: userData.id } });
    return res.status(200).json({
      status: true,
      message: `user: ${userData.nick} is login Success`,
      postList: userPost, //작성글 목록
    });
  } catch (err) {
    console.log("로그인 실패");
    return res.status(401).json("아이디 또는 비밀번호가 잘못되었습니다."); //deletedAt에 날짜 입력되면 에러처리됨
  }
});

router.post("/logout", (req, res, next) => {
  res.cookie("loginData", null, { maxAge: 0, httpOnly: true }); //쿠키삭제
  console.log("로그아웃되었습니다");
  return res.status(200).json("logout ok");
});

//유저 게시글정보 조회
router.get("/", async (req, res, next) => {
  const userId = req.cookies.loginData.id;
  console.log("유저 POST 조회 API", userId);
  try {
    const userPost = await Post.findAll({ where: { userId: userId } });
    return res.status(200).json({
      status: true,
      message: "유저 게시글정보 조회",
      postList: userPost,
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

module.exports = router;
