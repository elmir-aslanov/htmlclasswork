const BASE_URL = "http://localhost:3000/blogs";

const form = document.getElementById("blogForm");
const titleEl = document.getElementById("title");
const bodyEl = document.getElementById("body");
const authorEl = document.getElementById("author");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newBlog = {
    title: titleEl.value.trim(),
    body: bodyEl.value.trim(),
    author: authorEl.value
  };

  statusEl.textContent = "Göndərilir...";

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog)
    });

    if (!res.ok) throw new Error("POST failed");

    window.location.href = "./index.html";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Xəta: JSON Server işləyirmi?";
  }
});
