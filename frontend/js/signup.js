import { saveToken } from "./common.js";

const form = document.getElementById("signupForm");
const useridInput = document.getElementById("userid");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userid = useridInput.value.trim();
    const password = passwordInput.value.trim();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!userid || !password || !name || !email) {
        alert("필수 값을 모두 입력해주세요.");
        return;
    }

    try {
        const res = await fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid, password, name, email }),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            alert(data.message || "회원가입 실패");
            return;
        }

        const data = await res.json();

        // 회원가입 후 바로 로그인 유지(선택)
        try {
            saveToken(data.token);
        } catch (err) {
            console.warn("토큰 저장 실패:", err);
        }

        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        location.href = "login.html";
    } catch (err) {
        console.error(err);
        alert("서버 통신 중 오류가 발생했습니다.");
    }
});
