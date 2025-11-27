import { authHeader } from "./common.js";

const API_BASE = "http://localhost:8080/post";
const url = new URL(location.href);
const id = url.searchParams.get("id");

if (!id || id === "undefined") {
    alert("잘못된 접근입니다. 목록으로 이동합니다.");
    location.href = "posts.html";
}

const res = await fetch(`http://localhost:8080/post/${id}`, {
    headers: authHeader(),
});

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
    document.querySelector("#post").innerHTML = `<p>${post.text}</p>`;
}

document.querySelector("#editBtn").addEventListener("click", () => {
    location.href = `post-edit.html?id=${id}`;
});

document.querySelector("#deleteBtn").addEventListener("click", async () => {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: authHeader(),
    });

    if (!res.ok) {
        alert("삭제 실패");
        return;
    }

    location.href = "posts.html";
});

loadPost();
