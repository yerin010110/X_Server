import { authHeader } from "./common.js";

const API_BASE = "http://localhost:8080/post";
const url = new URL(location.href);
const id = url.searchParams.get("id");

async function loadPost() {
    const res = await fetch(`${API_BASE}/${id}`, {
        headers: authHeader(),
    });

    if (!res.ok) {
        alert("게시글을 불러오지 못했습니다");
        location.href = "posts.html";
        return;
    }

    const post = await res.json();
    document.querySelector("#text").value = post.text;
}

document.querySelector("#updateBtn").addEventListener("click", async () => {
    const text = document.querySelector("#text").value;

    const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ text }),
    });

    if (!res.ok) {
        alert("수정 실패");
        return;
    }

    location.href = `post-detail.html?id=${id}`;
});

loadPost();
