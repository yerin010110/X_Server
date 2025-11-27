import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { connectDB } from "./db/database.mjs";
import cors from "cors";

const app = express();

// 1) CORS 허용 – 프론트가 127.0.0.1:5500 에서 떠 있으니까 이 출처를 허용
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  })
);

// 2) JSON 파싱
app.use(express.json());

// 3) 라우터
app.use("/post", postsRouter);
app.use("/auth", authRouter);

// 4) 404 핸들러
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 5) DB 연결 후 서버 시작
connectDB()
  .then(() => {
    app.listen(config.host.port, () => {
      console.log(`서버 실행 중... http://localhost:${config.host.port}`);
    });
  })
  .catch(console.error);
