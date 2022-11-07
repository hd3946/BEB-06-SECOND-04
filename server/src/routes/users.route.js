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
router.post("/edit", isLoggedIn, upload.single("image"), edit);
router.post("/follow/:id", isLoggedIn, follow);

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

export default router;
