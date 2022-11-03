import express from "express"; 
const router = express.Router(); 

import users from "./users.route.js"; 
import postRouter from "./post.route.js";
import contractRouter from "./contract.js";
import commentRouter from "./comment.route.js";

router.use("/users", users); 
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/contract", contractRouter);


export default router;
