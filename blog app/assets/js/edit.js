const BASE_URL = "http://localhost:3000/blogs";
const params = new URLSearchParams(location.search);
const id = params.get("id");

const form = document.getElementById("editForm");
const titleEl = document.getElementById("title");
const bodyEl = document.getElementById("body");
const authorEl = document.getElementById("author");
const statusEl = document.getElementById("status");


async function loadBlog() {
    statusEl.textContent = "Yüklənir...";
    try {
        const res = await fetch(`${BASE_URL}/${id}`);
        if (!res.ok) throw new Error("Not found");

        const blog = await res.json();
        titleEl.value = blog.title || "";
        bodyEl.value = blog.body || "";
        authorEl.value = blog.author || "";
        statusEl.textContent = "";
    } catch (err) {
        console.error(err);
        statusEl.textContent = "Blog tapılmadı.";
        form.querySelector("button").disabled = true;
    }
}

loadBlog();

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.textContent = "Yadda saxlanılır...";

    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: Number(id),
                title: titleEl.value.trim(),
                body: bodyEl.value.trim(),
                author: authorEl.value.trim()
            })
        });

        if (!res.ok) throw new Error("PUT failed");

        window.location.href = "./index.html";
    } catch (err) {
        console.error(err);
        statusEl.textContent = "Xəta baş verdi.";
    }
});
