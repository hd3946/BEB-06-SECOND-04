var express = require("express");
var router = express.Router();

const tokenAddr = process.env.TOKEN_CONTRACT_ADDRESS;
const serverAddr = process.env.SERVER_ADDRESS; //가나슈1

const Contract = require("web3-eth-contract");
Contract.setProvider("http://localhost:7545");
const tokenABI = require("../../web3/tokenABI");
const tokenContract = new Contract(tokenABI, tokenAddr);

var { User, Post } = require("../../models/index");
var { upload } = require("./upload");
// const { isLoggedIn } = require('./middlewares');

/* post router listing. */
router.get("/list", upload.single("post"), async (req, res, next) => {
  try {
    const postList = await Post.findAll();
    console.log(postList);
    return res.status(200).json({
      status: true,
      message: "전제글목록 검색",
      postList,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/write", upload.single("post"), async (req, res, next) => {
  if (!req.cookies.loginData)
    return res.status(401).json("로그인되어 있지 않습니다.");
  try {
    const { id, address } = req.cookies.loginData;
    const { title, content } = req.body;
    console.log("유저 포스트 업로드", id);
    const post = await Post.create({
      title: title,
      content: content,
      // img: req.file.location,
      userId: id,
    });
    //해쉬태그
    // const hashtags = req.body.content.match(/#[^\s#]*/g);
    // if (hashtags) {
    //   const result = await Promise.all(
    //     hashtags.map(tag => {
    //       return Hashtag.findOrCreate({
    //         where: { title: tag.slice(1).toLowerCase() },
    //       })
    //     }),
    //   );
    //   await post.addHashtags(result.map(r => r[0]));
    // }
    if (post) {
      //게시글 하나 작성할때마다 토큰을 하나 전송
      const transferToken = await tokenContract.methods
        .transfer(address, 1)
        .send({ from: serverAddr }); //user에게 token를 전송
      const tokenBalance = await tokenContract.methods
        .balanceOf(address)
        .call();
      return res.status(200).json({
        status: true,
        message: "Post Success",
        tokenBalance: tokenBalance,
      });
    } else {
      const tokenBalance = await tokenContract.methods
        .balanceOf(address)
        .call();
      return res.status(200).json({
        status: false,
        message: "Post fail",
        tokenBalance: tokenBalance,
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
