import { authHeader } from "./common.js";

const API_BASE = "http://localhost:8080/post";

document.querySelector("#saveBtn").addEventListener("click", async () => {
    const text = document.querySelector("#text").value;

    const res = await fetch(API_BASE, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ text }),
    });

    if (!res.ok) {
        alert("작성 실패");
        return;
    }

    location.href = "posts.html";
});
