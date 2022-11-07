import ganache from "../web3/web3.js";
const { getTokenBalance, giveContribution } = ganache;
import { imgUpload } from "../web3/ipfs.js";
import {
  getPostList,
  createPost,
  updatePost,
  deletePost,
  countLike,
} from "../services/post.service.js";

// GET /list
const listPost = async (req, res, next) => {
  try {
    const postList = await getPostList();
    return res.status(200).json({
      status: true,
      message: "전제글목록 검색",
      postList, //최신게시글목록
    });
  } catch (err) {
    next(err);
  }
};

//POST /write
const writePost = async (req, res, next) => {
  try {
    const { id, address } = req.cookies.loginData;
    const { title, content } = req.body;
    const img = await imgUpload(req.file ? req.file.buffer : req.file);
    const post = await createPost(title, content, img, id);
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
    next(err);
  }
};

// POST "/edit"
const editPost = async (req, res, next) => {
  try {
    const { id } = req.cookies.loginData;
    const { postId, title, content } = req.body;
    await updatePost(postId, id, title, content);

    return res.status(200).json({
      status: true,
      message: "edit success",
    });
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Not Authorized",
    });
  }
};

// POST /delete
const deletedPost = async (req, res, next) => {
  try {
    const { id } = req.cookies.loginData;
    const { postId } = req.body;
    await deletePost(postId, id);

    return res.status(200).json({
      status: true,
      message: "delete success",
    });
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Not Authorized",
    });
  }
};

//POST "/like/:postId" ,
const likePost = async (req, res, next) => {
  try {
    const userId = req.cookies.loginData.id;
    const postId = req.params.postId; //작성되지 않은 postId일시 에러발생

    const data = await countLike(userId, postId);

    if (data.status) {
      return res.status(200).json({
        status: true,
        message: "liked",
        count: data.count, //현재 게시글 좋아요 갯수
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "cancel liked",
        count: data.count, //현재 게시글 좋아요 갯수
      });
    }
  } catch (err) {
    next(err);
  }
};

export { listPost, writePost, editPost, deletedPost, likePost };
