import express from "express";
const router = express.Router();
import { isLoggedIn } from "./middleware.js";
import { listComment, writeComment, editComment, deletedComment, likeComment} from "../controllers/comment.controller.js";

/* post router listing. */
router.get("/list", listComment);
router.post("/write", isLoggedIn, writeComment);
router.post("/edit", isLoggedIn, editComment);
router.post("/delete", isLoggedIn, deletedComment);
router.post("/like/:commentId", isLoggedIn, likeComment);

/**
 * @swagger
 * paths:
 *  /comment/list?postId:
 *    get:
 *      summary: "댓글 조회"
 *      description: "해당 게시글의 댓글을 조회"
 *      tags: [Comment]
 *      parameters:  [
 *           {
 *               "name": "postId",
 *               "in": "query",
 *               "description": "input postId",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "1"
 *               }
 *           }
 *       ]
 *      responses:
 *          "200":
 *             description: 댓글조회 완료
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
 *                          comments:
 *                              type: array,
 *                              example: []
 */

/**
 * @swagger
 * paths:
 *  /comment/write:
 *    post:
 *      summary: "댓글 작성"
 *      description: "해당 게시글의 댓글을 작성"
 *      tags: [Comment]
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
 *           },
 *           {
 *               "name": "content",
 *               "in": "body",
 *               "description": "input content",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "content"
 *               }
 *           }
 *       ]
 *      responses:
 *          "200":
 *             description: 댓글작성 완료
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
 *                              example: "Write uccess"
 */

/**
 * @swagger
 * paths:
 *  /comment/edit:
 *    post:
 *      summary: "댓글 수정"
 *      description: "해당 게시글의 댓글을 수정"
 *      tags: [Comment]
 *      parameters:  [
 *           {
 *               "name": " commentId",
 *               "in": "body",
 *               "description": "input commentId",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "1"
 *               }
 *           },
 *           {
 *               "name": "content",
 *               "in": "body",
 *               "description": "input content",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "content"
 *               }
 *           }
 *       ]
 *      responses:
 *          "200":
 *             description: 댓글수정 완료
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
 */

/**
 * @swagger
 * paths:
 *  /comment/delete:
 *    post:
 *      summary: "댓글 삭제"
 *      description: "해당 게시글의 댓글을 삭제"
 *      tags: [Comment]
 *      parameters:  [
 *           {
 *               "name": "commentId",
 *               "in": "body",
 *               "description": "input commentId",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "1"
 *               }
 *           }
 *       ]
 *      responses:
 *          "200":
 *             description: 댓글삭제 완료
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
 */

/**
 * @swagger
 * paths:
 *  /comment/like/:postId: 
 *    post:
 *      summary: "댓글 좋아요"
 *      description: "작성한 댓글의 좋아요를 누르고 재호출시 취소"
 *      tags: [Comment]
 *      parameters:  [
 *           {
 *               "name": "commentId",
 *               "in": "params",
 *               "description": "commentId to press like",
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
