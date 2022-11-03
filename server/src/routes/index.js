import express from "express"; 
const router = express.Router(); 

import users from "./users.route.js"; 
import postRouter from "./post.route.js";
import contractRouter from "./contract.js";
import commentRouter from "./comment.route.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */

router.use("/users", users); 

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: 게시글 추가 수정 삭제 조회
 */

router.use("/post", postRouter);

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: 댓글 추가 수정 삭제 조회
 */

router.use("/comment", commentRouter);

/**
 * @swagger
 * tags:
 *  name: Contract
 *  description: 컨트랙트 관련
 */

router.use("/contract", contractRouter);


export default router;
