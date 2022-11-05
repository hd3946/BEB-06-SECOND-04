import express from "express";
const router = express.Router();
import upload from "./upload.js";
import { isLoggedIn } from "./middleware.js";
import { transfer, myNFT, mint } from "../controllers/contract.controller.js";


/* transfer token  */
router.post("/token", isLoggedIn, transfer);
router.get("/mynft", isLoggedIn, upload.single('image'), myNFT);
router.post("/mint", isLoggedIn, upload.single('image'), mint);

export default router;
