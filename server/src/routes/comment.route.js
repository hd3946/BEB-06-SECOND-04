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

export default router;
