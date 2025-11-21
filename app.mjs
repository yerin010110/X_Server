import express from "express"; // json 통신을 이용
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";

const app = express();

app.use(express.json()); // 미들웨어에 json 등록

app.use("/post", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(8080); // 기본 포트가 3000 이기에 피하기 위해 작성
