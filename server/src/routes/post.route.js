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

export default router;
