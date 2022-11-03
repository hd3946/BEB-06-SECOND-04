import express from "express";
const app = express();
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./src/models/index.js";
import routes from "./src/routes/index.js";

app.set("port", process.env.PORT || 3005);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));

const corsOption = {
  origin: "http://localhost:3000",
  methods: 'POST,PUT,DELETE,GET',
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

sequelize
  .sync({ alter: false }) // force:true 일경우 테이블 전부 지우고 새로 설정~!  alter
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/", routes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(400).send("Something broke!");
});

app.use((req, res, next) => {
  return res.status(404).send("invalid path");
});

app.listen(app.get("port"), () => {
  console.log(`✅ Server running on http://localhost:${app.get("port")}`);
});

export default app;
