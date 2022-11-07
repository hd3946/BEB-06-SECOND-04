import express from "express";
const router = express.Router();
import { isLoggedIn } from "./middleware.js";
import {
  signin,
  signout,
  signup,
  info,
  edit,
  follow,
} from "../controllers/user.controller.js";
import upload from "./upload.js";

/* users router listing. */
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/signup", signup);
router.get("/info", isLoggedIn, info);
router.post("/edit",isLoggedIn, upload.single("image"), edit);
router.post("/follow/:id",isLoggedIn, follow);

/**
 * @swagger
 * paths:
 *  /users/signin:
 *    post:
 *      summary: "로그인"
 *      description: "서버에 Post방식으로 데이터를 전송하여 DB 유저 정보 저장~!"
 *      tags: [Users]
 * 
 *      parameters:  [
 *           {
 *               "name": "email",
 *               "in": "body",
 *               "description": "input your email, it is an unique value",
 *               "required": true,
 *               "schema": {
 *                    "type": "object",
 *                    "properties": {
 *                        "email": {
 *                          "type": string,
 *                          "example": "email@naver.com"
 *                        },
 *                        "password":{
 *                          "type": string,
 *                        }
 *                      }
 *               }
 *           }
 *       ]
 *      responses:
 *          "200":
 *             description: 유저 회원가입 완료
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
 *                              example: "user: Fantastic4 is Signup Success"
 *                               
 */

/**
 * @swagger
 * paths:
 *  /users/signout:
 *    post:
 *      summary: "로그아웃"
 *      description: "로그인된 유저 로그아웃 쿠키삭제"
 *      tags: [Users]
 *      parameters:  []
 *      responses:
 *          "200":
 *             description: 유저 로그아웃
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
 *                              example: "logout ok"
 *                               
 */

/**
 * @swagger
 * paths:
 *  /users/signup:
 *    post:
 *      summary: "유저 회원가입"
 *      description: "서버에 Post방식으로 데이터를 전송하여 DB 유저 정보 저장~!"
 *      tags: [Users]
 *      parameters:  [
 *           {
 *               "name": "email",
 *               "in": "body",
 *               "description": "input your email, it is an unique value",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "email@naver.com"
 *               }
 *           },
 *           {
 *               "name": "nickname",
 *               "in": "body",
 *               "description": "input your nickname",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "Fantastic4"
 *               }
 *           },
 *           {
 *               "name": "password",
 *               "in": "body",
 *               "description": "input your password",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "password"
 *               }
 *           },
 *           {
 *               "name": "address",
 *               "in": "body",
 *               "description": "Ganache Address",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "0x00"
 *               }
 *           }
 *       ]
 *      responses:
 *          "200":
 *             description: 유저 회원가입 완료
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
 *                              example: "user: Fantastic4 is Signup Success"
 *                               
 */

/**
 * @swagger
 * paths:
 *  /users/info:
 *    get:
 *      summary: "유저 정보"
 *      description: "유저Id를 받아 해당 유저의 정보를 return 해준다."
 *      tags: [Users]
 *      parameters:  [
 *           {
 *               "name": "userId",
 *               "in": "cookie",
 *               "description": "유저id값",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "email@naver.com"
 *               }
 *           },
 *           {
 *               "name": "address",
 *               "in": "cookie",
 *               "description": "유저 지갑주소",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "0x00"
 *               }
 *           },  
 *       ]
 *      responses:
 *          "200":
 *             description: 유저 회원가입 완료
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
 *                              example: "유저정보 검색"
 *                          loginData:
 *                              type: object,
 *                              example: "{userId, 0x00}"
 *                          ethBalance:
 *                              type: object,
 *                              example: "{}"
 *                          tokenBalance:
 *                              type: object,
 *                              example: "{}"
 *                          nftBalance:
 *                              type: object,
 *                              example: "{}"
 *                          postList:
 *                              type: object,
 *                              example: "{}"
 *
 *                               
 */

/**
 * @swagger
 * paths:
 *  /users/edit:
 *    post:
 *      summary: "회원정보 수정"
 *      description: "유저 프로필 이미지 및 유저 정보 수정기능"
 *      tags: [Users]
 *      parameters:  [
 *           {
 *               "name": "userId",
 *               "in": "cookie",
 *               "description": "userId 쿠키를 통해 입력",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "1"
 *               }
 *           },
 *           {
 *               "name": "profileUrl",
 *               "in": "file.buffer",
 *               "description": "유저 프로필 이미지",
 *               "required": false,
 *               "schema": {
 *                   "type": "buffer",
 *                   "example": ""
 *               }
 *           },  
 *       ]
 *      responses:
 *          "200":
 *             description: 유저 데이터 수정완료
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
 *                              example: "My-profile"
 *                               
 */

/**
 * @swagger
 * paths:
 *  /users/follow/:id:
 *    post:
 *      summary: "유저 팔로우"
 *      description: "서버에 Post방식으로 데이터를 전송하여 로그인한 유저가 params를 통해 팔로우할 유저 id 전달 이미 팔로워 되어있을 경우 팔로우 취소"
 *      tags: [Users]
 *      parameters: [
 *           {
 *               "name": "userId",
 *               "in": "cookie",
 *               "description": "쿠키로 userId 받아오기",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "1"
 *               }
 *           },
 *           {
 *               "name": "followerId",
 *               "in": "params",
 *               "description": "url파라미터로 팔로워아이디 받아오기",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "2"
 *               }
 *           }
 *       ] 
 *      responses:
 *       200:
 *        description: 유저 follwing완료 or (follwing된 경우) 팔로잉취소
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               status:
 *                  type: boolean,
 *                  example: true
 *               message:
 *                  type: string,
 *                  example: "unfollow/follow success"
 *       403:
 *        description: 헤더의 토큰 값이 만료됐을 때
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/expiredToken'
 *       400:
 *        description: params 값이 없을 때
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/noParams'
 *       404:
 *        description: DB에서 필요한 값을 찾지 못할 때
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/wrongDBIndex'
 *       
 */
export default router;
