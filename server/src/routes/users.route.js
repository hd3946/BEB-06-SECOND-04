import express from "express";
import { signin, signout, signup, info, edit, follow } from "../controllers/user.controller.js";
import upload from "./upload.js";
const router = express.Router();

/* users router listing. */
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/signup", signup);
router.post("/info", info);
router.post("/edit", edit);
router.post("/follow/:id", upload.single("post"), follow);

export default router;
