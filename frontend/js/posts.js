import { authHeader } from "./common.js";

// 로그인한 사용자 이름 우측 상단에 표시
const userSpan = document.querySelector("#currentUserName");
if (userSpan) {
    try {
        const name = localStorage.getItem("currentUserName");
        userSpan.textContent = name ? `${name} 님` : "로그인 사용자";
    } catch (err) {
        console.warn("이름 조회 실패:", err);
        userSpan.textContent = "로그인 사용자";
    }
}

const API_BASE = "http://localhost:8080/post";

async function loadPosts() {
    const res = await fetch(API_BASE, {
        headers: authHeader(),
    });

    if (!res.ok) {
        alert("로그인이 필요합니다");
        location.href = "login.html";
        return;
    }

    const posts = await res.json();
    const tbody = document.querySelector("#postList");

    tbody.innerHTML = posts
        .map(
            (p, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>
            <a href="post-detail.html?id=${p._id}" class="link-underline">
              ${p.text}
            </a>
          </td>
          <td>${p.userid || "-"}</td>
          <td>${new Date(p.createdAt).toLocaleString()}</td>
        </tr>
      `
        )
        .join("");
}

document.getElementById("newPostBtn").addEventListener("click", () => {
    location.href = "post-new.html";
});

loadPosts();
