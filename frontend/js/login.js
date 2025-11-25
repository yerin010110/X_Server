import { saveToken } from "./common.js";

document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = username.value;
    const password = password.value;

    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return alert("로그인 실패");

    const data = await res.json();
    saveToken(data.token);

    location.href = "posts.html";
});
