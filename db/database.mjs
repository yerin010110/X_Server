import mysql from "mysql2";
import { config } from "../config.mjs";

// 미리 연결해 놓고 사용자들이 언제든지 사용할 수 있도록 설정해놓는 게 pool
const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
});
export const db = pool.promise();
