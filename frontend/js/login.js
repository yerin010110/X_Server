import { saveToken } from "./common.js";

const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }

    try {
        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: username, password }),
            // API 스펙에 맞게 key 이름(userid, username 등) 확인해서 맞추기
        });

        if (!res.ok) {
            alert("로그인 실패 (아이디/비밀번호를 확인해주세요)");
            return;
        }

        const data = await res.json();
        // data.token 형태라고 가정
        saveToken(data.token);

        // 다음 페이지로 이동
        window.location.href = "posts.html";
    } catch (err) {
        console.error(err);
        alert("서버 통신 중 오류가 발생했습니다.");
    }
});
