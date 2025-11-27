import mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";

// User 스키마 정의
const userSchema = new mongoose.Schema(
    {
        userid: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        url: String,
    },
    { timestamps: true }
);

// _id → id 가상 필드 설정
useVirtualId(userSchema);

// 모델 생성
const User = mongoose.model("User", userSchema);

// 회원 생성
export async function createUser(user) {
    return new User(user).save();
}

// userid 로 조회
export async function findByUserid(userid) {
    return User.findOne({ userid });
}

// id(_id) 로 조회
export async function findById(id) {
    return User.findById(id);
}
