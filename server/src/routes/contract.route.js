import express from "express";
const router = express.Router();
import upload from "./upload.js";
import { isLoggedIn } from "./middleware.js";
import { transfer, myNFT, mint } from "../controllers/contract.controller.js";

/* transfer token  */
router.post("/token", isLoggedIn, transfer);
router.get("/mynft", isLoggedIn, upload.single('image'), myNFT);
router.post("/mint", isLoggedIn, upload.single('image'), mint);

/**
 * @swagger
 * paths:
 *  /contract/tranfer:
 *    post:
 *      summary: "토큰 전송"
 *      description: "ERC20 컨트랙트를 통해 배포한 토큰를 전송"
 *      tags: [Contract]
 *      parameters:  [
 *           {
 *               "name": "address",
 *               "in": "body",
 *               "description": "Address to send",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "0x00"
 *               }
 *           },
 *           {
 *               "name": "balance",
 *               "in": "body",
 *               "description": "Send amount",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "1"
 *               }
 *           }
 *       ]
 *      responses:
 *          "200":
 *             description: 토큰 전송 완료
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
 *                              example: "transfer to userAddr: 0x00 || 1 Token."
 *                          tokenBalance:
 *                              type: string,
 *                              example: "1"          
 *                                   
 *                                   
 */

export default router;
