const BASE_URL = "http://localhost:3000/blogs";

const listEl = document.getElementById("list");
const searchEl = document.getElementById("search");
const statusEl = document.getElementById("status");

function shortText(text, limit = 100) {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
}

function card(blog) {
    return `
    <article class="card" data-id="${blog.id}">
      <h3>${blog.title}</h3>

      <p class="snippet">
        ${shortText(blog.body, 100)}
        <a class="read-more" href="./edit.html?id=${blog.id}">Read More</a>
      </p>

      <p class="author">written by ${blog.author}</p>

      <div class="actions">
        <button class="btn delete" data-action="delete">Delete</button>
        <a class="btn edit" href="./edit.html?id=${blog.id}">Edit</a>
      </div>
    </article>
  `;
}

async function loadBlogs(q = "") {
    statusEl.textContent = "Loading...";
    const url = q ? `${BASE_URL}?q=${encodeURIComponent(q)}` : BASE_URL;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed");

        const blogs = await res.json();
        listEl.innerHTML = blogs.map(card).join("");
        statusEl.textContent = blogs.length ? "" : "No result.";
    } catch (err) {
        console.error(err);
        statusEl.textContent = "Xəta: JSON Server işləyirmi? (localhost:3000)";
    }
}

let t = null;
searchEl.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => loadBlogs(searchEl.value.trim()), 250);
});


listEl.addEventListener("click", async (e) => {
    const btn = e.target.closest('button[data-action="delete"]');
    if (!btn) return;

    const cardEl = e.target.closest(".card");
    const id = cardEl.dataset.id;

    const ok = confirm("Bu blog silinsin?");
    if (!ok) return;

    try {
        const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
        loadBlogs(searchEl.value.trim());
    } catch (err) {
        console.error(err);
        alert("Silinmə zamanı xəta oldu.");
    }
});

loadBlogs();
