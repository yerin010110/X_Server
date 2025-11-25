document.querySelector("#signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = username.value;
    const password = password.value;

    const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return alert("회원가입 실패");

    alert("가입 완료! 로그인해주세요.");
    location.href = "login.html";
});
