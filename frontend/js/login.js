// frontend/js/login.js
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
        });

        console.log("login response status:", res.status);

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            console.warn("login error response:", errData);
            alert(
                errData.message ||
                    "로그인 실패 (아이디/비밀번호를 확인해주세요)"
            );
            return;
        }

        const data = await res.json();
        console.log("login success data:", data);

        // 토큰 저장 시도
        try {
            saveToken(data.token);
        } catch (err) {
            console.warn("토큰 저장 중 에러:", err);
        }

        // 현재 로그인한 사용자 아이디(또는 이름) 저장
        try {
            // userid 대신 name 을 쓰고 싶으면 data.user.name 으로 변경
            localStorage.setItem("currentUserName", data.user.userid);
        } catch (err) {
            console.warn("유저 이름 저장 중 에러:", err);
        }

        // 다음 페이지로 이동
        window.location.href = "posts.html";
    } catch (err) {
        console.error("로그인 요청 중 예외:", err);
        alert("서버 통신 중 오류가 발생했습니다.");
    }
});
