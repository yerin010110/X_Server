import express from "express"; // json 통신을 이용
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { connectDB } from "./db/database.mjs";

const app = express();

app.use(express.json()); // 미들웨어에 json 등록

app.use("/post", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

connectDB()
    .then(() => {
        app.listen(config.host.port);
    })
    .catch(console.log.error);
