var express = require("express");
var router = express.Router();

const tokenAddr = process.env.TOKEN_CONTRACT_ADDRESS;
const serverAddr = process.env.SERVER_ADDRESS; //가나슈1

const Contract = require("web3-eth-contract");
Contract.setProvider("http://localhost:7545");
const tokenABI = require("../../web3/tokenABI");
const tokenContract = new Contract(tokenABI, tokenAddr);

var { User, Post, Comment } = require("../../models/index");
var { upload } = require("./upload");
// const { isLoggedIn } = require('./middlewares');

/* post router listing. */
router.get("/list", upload.single("post"), async (req, res, next) => {
  try {
    const postList = await Post.findAll({
      attributes: [['id', 'postId'], 'title', 'content', 'createdAt', 'updatedAt' ],
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
    });
    return res.status(200).json({
      status: true,
      message: "전제글목록 검색",
      postList, //최신게시글목록
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
        tokenBalance,
      });
    } else {
      const tokenBalance = await tokenContract.methods
        .balanceOf(address)
        .call();
      return res.status(401).json({
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

router.post("/edit", upload.single("post"), async (req, res, next) => {
  if (!req.cookies.loginData)
    return res.status(401).json("로그인되어 있지 않습니다.");
  try {
    const { id } = req.cookies.loginData;
    const { postId, title, content } = req.body;
    const data = await Post.findOne({ where: { id: postId } });
    const postingUser = data.toJSON().userId
    if (postingUser === id) { //수정은 작성자만 가능
      const update = data.update({ //update 날짜는 자동으로 변경
          title: title,
          content: content,
      })
      return res.status(200).json({
        status: true,
        message: "edit success",
      })
    } else {
      return res.status(401).json({
        status: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/delete", upload.single("post"), async (req, res, next) => {
  if (!req.cookies.loginData)
    return res.status(401).json("로그인되어 있지 않습니다.");
  try {
    const { id } = req.cookies.loginData;
    const { postId } = req.body;
    const data = await Post.findOne({ where: { id: postId } });
    const postingUser = data.toJSON().userId
    if (postingUser === id) { //삭제는 작성자만 가능
      data.destroy()
      .then(() => {
        return res.status(200).json({
          status: true,
          message: "delete success",
        });
      })
      .catch((error) => next(error))
    } else {
      return res.status(401).json({
        status: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
