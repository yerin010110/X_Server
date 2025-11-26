import { authHeader } from "./common.js";

const url = new URL(location.href);
const id = url.searchParams.get("id");

async function loadPost() {
    const res = await fetch(`http://localhost:3000/posts/${id}`, {
        headers: authHeader(),
    });

    const post = await res.json();
    document.querySelector("#post").innerHTML = `<p>${post.text}</p>`;
}

document.querySelector("#editBtn").addEventListener("click", () => {
    location.href = `post-edit.html?id=${id}`;
});

document.querySelector("#deleteBtn").addEventListener("click", async () => {
    const res = await fetch(`http://localhost:8080/posts/${id}`, {
        method: "DELETE",
        headers: authHeader(),
    });

    if (!res.ok) return alert("삭제 실패");

    location.href = "posts.html";
});

loadPost();
