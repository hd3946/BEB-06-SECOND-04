import express from "express";
const router = express.Router();
import upload from "./upload.js";
import { isLoggedIn } from "./middleware.js";
import { listPost, writePost, editPost ,deletedPost, likePost } from "../controllers/post.controller.js"

/* post router listing. */
router.post("/list", listPost);
router.post("/write", isLoggedIn, writePost);
router.post("/edit", isLoggedIn, upload.single("post"), editPost);
router.post("/delete", isLoggedIn, deletedPost);
router.post("/like/:postId", isLoggedIn, likePost);

export default router;
