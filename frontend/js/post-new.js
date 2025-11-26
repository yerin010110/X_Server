import { authHeader } from "./common.js";

document.querySelector("#saveBtn").addEventListener("click", async () => {
  const text = document.querySelector("#text").value;

  const res = await fetch("http://localhost:8080/posts", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ text }),
  });

  if (!res.ok) return alert("작성 실패");

  location.href = "posts.html";
});
