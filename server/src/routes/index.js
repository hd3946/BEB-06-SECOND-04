import express from "express"; 
const router = express.Router(); 

import usersRouter from "./users.route.js"; 
import postRouter from "./post.route.js";
import contractRouter from "./contract.route.js";
import commentRouter from "./comment.route.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */

router.use("/users", usersRouter); 

/**
 * @swagger
 * tags:
 *  name: Post 
 *  description: 게시글 추가 수정 삭제 조회
 */

router.use("/post", postRouter);

/**
 * @swagger
 * tags:
 *  name: Comment
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
