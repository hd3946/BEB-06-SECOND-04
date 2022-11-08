import express from "express";
const router = express.Router();
import upload from "./upload.js";
import { isLoggedIn } from "./middleware.js";
import {
  listPost,
  writePost,
  editPost,
  deletedPost,
  likePost,
} from "../controllers/post.controller.js";

/* post router listing. */
router.get("/list", listPost);
router.post("/write", isLoggedIn, upload.single("image"), writePost);
router.post("/edit", isLoggedIn, upload.single("image"), editPost);
router.post("/delete", isLoggedIn, deletedPost);
router.post("/like/:postId", isLoggedIn, likePost);

/**
 * @swagger
 * paths:
 *  /post/list:
 *    get:
 *      summary: "게시글 검색"
 *      description: "전체 게시글 및 댓글 조회"
 *      tags: [Post]
 * 
 *      parameters:  []
 *      responses:
 *          "200":
 *             description: 조회 완료
 *             content:
 *              application/json:
 *                  schema:
 *                      type: object   
 *                      properties:
 *                          status:
 *                              type: boolean,
 *                              example: true
 *                          message:
 *                              type: string,
 *                              example: "Success"
 *                          postList:
 *                              type: array,
 *                              example: []
 *                               
 */

/**
 * @swagger
 * paths:
 *  /post/write:
 *    post:
 *      summary: "게시글 작성"
 *      description: "제목, 내용, 이미지 삽입가능"
 *      tags: [Post]
 *      parameters:  [
 *           {
 *               "name": "title",
 *               "in": "body",
 *               "description": "input your title",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "tiltle"
 *               }
 *           },
 *           {
 *               "name": "content",
 *               "in": "body",
 *               "description": "input your content",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "content"
 *               }
 *           },
 *           {
 *               "name": "img",
 *               "in": "file",
 *               "description": "input your image",
 *               "required": false,
 *               "schema": {
 *                   "type": "buffer"
 *               }
 *           },
 *      ]
 *      responses:
 *          "200":
 *             description: 게시글 작성 완료
 *             content:
 *              application/json:
 *                  schema:
 *                      type: object   
 *                      properties:
 *                          status:
 *                              type: boolean,
 *                              example: true
 *                          message:
 *                              type: string,
 *                              example: "Write success"
 *                          tokenBalance:
 *                              type: string,
 *                              example: "1"
 *                               
 */

/**
 * @swagger
 * paths:
 *  /post/edit:
 *    post:
 *      summary: "게시글 수정"
 *      description: "작성한 게시글의 제목, 내용, 이미지를 수정"
 *      tags: [Post]
 *      parameters:  [
 *           {
 *               "name": "title",
 *               "in": "body",
 *               "description": "input your title",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "tiltle"
 *               }
 *           },
 *           {
 *               "name": "content",
 *               "in": "body",
 *               "description": "input your content",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "content"
 *               }
 *           },
 *           {
 *               "name": "img",
 *               "in": "file",
 *               "description": "input your image",
 *               "required": false,
 *               "schema": {
 *                   "type": "buffer"
 *               }
 *           }
 *      ]
 *      responses:
 *          "200":
 *             description: 게시글 수정 완료
 *             content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: boolean,
 *                              example: true
 *                          message:
 *                              type: string,
 *                              example: "Edit success"
 *
 */

/**
 * @swagger
 * paths:
 *  /post/delete:
 *    post:
 *      summary: "게시글 삭제"
 *      description: "작성한 게시글을 삭제"
 *      tags: [Post]
 *      parameters:  [
 *           {
 *               "name": "postId",
 *               "in": "body",
 *               "description": "input postId",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "1"
 *               }
 *           }
 *      ]
 *      responses:
 *          "200":
 *             description: 게시글 삭제 완료
 *             content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: boolean,
 *                              example: true
 *                          message:
 *                              type: string,
 *                              example: "Delete success"
 *
 */

/**
 * @swagger
 * paths:
 *  /post/like/:postId: 
 *    post:
 *      summary: "게시글 좋아요"
 *      description: "작성한 게시글의 좋아요를 누르고 재호출시 취소"
 *      tags: [Post]
 *      parameters:  [
 *           {
 *               "name": "postId",
 *               "in": "params",
 *               "description": "postId to press like",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "1"
 *               }
 *           }
 *      ]
 *      responses:
 *          "200":
 *             description: 좋아요 입력 또는 취소완료
 *             content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: boolean,
 *                              example: true
 *                          message:
 *                              type: string,
 *                              example: "liked or cancel liked"
 *                          count: 
 *                              type: string,
 *                              example: "1"
 *
 */


export default router;
