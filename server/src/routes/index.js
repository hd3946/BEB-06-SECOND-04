import express from "express"; 
const router = express.Router(); 

import users from "./users.route.js"; 
// import postRouter from "./routes/post.js";
// import contractRouter from "./routes/contract.js";
// import commentRouter from "./routes/comment.js";
router.use("/users", users); 
// app.use("/post", postRouter);
// app.use("/comment", commentRouter);
// app.use("/contract", contractRouter);


export default router;
