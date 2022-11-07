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
 */

/**
 * @swagger
 * paths:
 *  /contract/mynft:
 *    get:
 *      summary: "나의 NFT 조회"
 *      description: "나의 계정 address로 Mint한 NFT 조회"
 *      tags: [Contract]
 *      parameters:  []
 *      responses:
 *          "200":
 *             description: "토큰 조회 완료"
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
 *                              example: "search my NFT"
 *                          myToken:
 *                              type: object,
 *                              example:         
 *                                {
 *                                  "tokenId": "1",
 *                                  "metaData": {
 *                                      "name": "name",
 *                                      "description": "description",
 *                                      "image": "https://ipfs.io/ipfs/CID",
 *                                      "attributes": [{
 *                                        "trait_type": "type", "value": "value"
 *                                       }]
 *                                   }                              
 *                                }                          
 */

/**
 * @swagger
 * paths:
 *  /contract/mint:
 *    post:
 *      summary: "NFT Mint"
 *      description: "토큰으로 NFT Mint"
 *      tags: [Contract]
 *      parameters: [
 *           {
 *               "name": "name",
 *               "in": "body",
 *               "description": "NFT name",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "name"
 *               }
 *           },
 *           {
 *               "name": "description",
 *               "in": "body",
 *               "description": "NFT description",
 *               "required": true,
 *               "schema": {
 *                   "type": "string",
 *                   "example": "description"
 *               }
 *           },
 *           {
 *               "name": "attributes",
 *               "in": "body",
 *               "description": "NFT attributes",
 *               "required": true,
 *               "schema": {
 *                   "type": "array",
 *                   "example": [{
 *                     "trait_type": "type", "value": "value"
 *                    }]
 *               }
 *           }
 *      ]
 *      responses:
 *          "200":
 *             description: "NFT Mint 완료"
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
 *                              example: "success"
 *                          nftTokenId:
 *                              type: stiring,
 *                              example: "1" 
 *                          nftBalance:
 *                              type: stiring,
 *                              example: "1"
 *                          tokenBalance:
 *                              type: stiring,
 *                              example: "0"
 *                          transactionHash:
 *                              type: stiring,
 *                              example: "0x00"
 *                        
 */

export default router;
