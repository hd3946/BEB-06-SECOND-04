import express from "express";
import { signin, signout, signup, info, edit, follow } from "../controllers/user.controller.js";
import upload from "./upload.js";
const router = express.Router();

/* users router listing. */

/**
 * @swagger
 * paths:
 *  /users/signin:
 *    post:
 *      summary: "유저 회원가입"
 *      description: "서버에 Post방식으로 데이터를 전송하여 DB 유저 정보 저장~!"
 *      tags: [Users]
 *      responses:
 *          "200":
 *             description: 유저 회원가입 완료
 *             content:
 *              application/json:
 *                  schema:
 *                      type: object   
 *                      properties:
 *                          ok:
 *                              type: string
 *                          users:
 *                              type: object
 *                          example:
 *                              [
 *                                  { "id": 1, "name": "유저1" },
 *                              ]
 */
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/signup", signup);
router.get("/info", info);
router.post("/edit", edit);
router.post("/follow/:id", upload.single("post"), follow);

export default router;
