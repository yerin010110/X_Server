import { authHeader } from "./common.js";

const url = new URL(location.href);
const id = url.searchParams.get("id");

async function load() {
    const res = await fetch(`http://localhost:8080/posts/${id}`, {
        headers: authHeader(),
    });

    const post = await res.json();
    document.querySelector("#text").value = post.text;
}

document.querySelector("#updateBtn").addEventListener("click", async () => {
    const text = document.querySelector("#text").value;

    const res = await fetch(`http://localhost:8080/posts/${id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ text }),
    });

    if (!res.ok) return alert("수정 실패");

    location.href = "post-detail.html?id=" + id;
});

load();
