import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

async function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec,
    });
}

// 회원가입
export async function signup(req, res) {
    const { userid, password, name, email, url } = req.body;

    const found = await authRepository.findByUserid(userid);
    if (found) {
        return res.status(409).json({ message: `${userid}이 이미 있습니다` });
    }

    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

    const user = await authRepository.createUser({
        userid,
        password: hashed,
        name,
        email,
        url,
    });

    const token = await createJwtToken(user.id);
    return res.status(201).json({ token, user });
}

// 로그인
export async function login(req, res) {
    const { userid, password } = req.body;

    const user = await authRepository.findByUserid(userid);
    if (!user) {
        return res
            .status(401)
            .json({ message: "아이디 또는 비밀번호를 확인해주세요." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res
            .status(401)
            .json({ message: "아이디 또는 비밀번호를 확인해주세요." });
    }

    const token = await createJwtToken(user.id);

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            userid: user.userid,
            name: user.name,
            email: user.email,
            url: user.url,
        },
    });
}

// 로그인 유지(/auth/me)
export async function me(req, res) {
    const user = await authRepository.findById(req.id);
    if (!user) {
        return res.status(404).json({ message: "일치하는 사용자가 없음" });
    }

    return res.status(200).json({
        id: user.id,
        userid: user.userid,
        name: user.name,
        email: user.email,
        url: user.url,
    });
}
