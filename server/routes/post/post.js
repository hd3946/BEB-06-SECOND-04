import express from "express";
const router = express.Router();
import upload from "./upload.js";

import { db } from "../../models/index.js";
const { User, Post, Comment } = db;
import ganache from "../../web3/web3.js";
const { getTokenBalance, giveContribution } = ganache;

/* post router listing. */
router.get("/list", upload.single("post"), async (req, res, next) => {
  try {
    const postList = await Post.findAll({
      attributes: [
        ["id", "postId"],
        "title",
        "content",
        "createdAt",
        "updatedAt",
      ],
      include: [
        { model: User, attributes: ["email", "nickname"] },
        {
          model: Comment,
          attributes: [
            ["id", "commentId"],
            "content",
            "createdAt",
            "updatedAt",
            "commenter",
            "postId",
          ],
          include: { model: User, attributes: ["email", "nickname"] },
        },
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
      const transferToken = await giveContribution(address, 1); //user에게 token 1개를 전송
      const tokenBalance = await getTokenBalance(address);
      return res.status(200).json({
        status: true,
        message: "Post Success",
        tokenBalance,
      });
    } else {
      const tokenBalance = await getTokenBalance(address);
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
    const postingUser = data.toJSON().userId;
    if (postingUser === id) {
      //수정은 작성자만 가능
      const update = data.update({
        //update 날짜는 자동으로 변경
        title: title,
        content: content,
      });
      return res.status(200).json({
        status: true,
        message: "edit success",
      });
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
    const postingUser = data.toJSON().userId;
    if (postingUser === id) {
      //삭제는 작성자만 가능
      data.destroy();
      return res.status(200).json({
        status: true,
        message: "delete success",
      });
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

export default router;
