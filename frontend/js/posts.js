import { authHeader } from "./common.js";

async function loadPosts() {
  const res = await fetch("http://localhost:8080/posts", {
    headers: authHeader(),
  });

  if (!res.ok) {
    alert("로그인이 필요합니다.");
    return location.href = "login.html";
  }

  const posts = await res.json();
  const list = document.querySelector("#postList");

  list.innerHTML = posts.map(
    (p) => `<p><a href="post-detail.html?id=${p.id}">${p.text}</a></p>`
  ).join("");
}

loadPosts();
