// LocalStorage-dən oxu (yoxdursa 0)
let count = localStorage.getItem("count")
    ? parseInt(localStorage.getItem("count"))
    : 0;

const countEl = document.getElementById("count");
const incBtn = document.getElementById("increase");
const decBtn = document.getElementById("decrease");

// Ekrana yaz
countEl.textContent = count;

incBtn.addEventListener("click", () => {
    count++;
    countEl.textContent = count;
    localStorage.setItem("count", count);
});

decBtn.addEventListener("click", () => {
    count--;
    countEl.textContent = count;
    localStorage.setItem("count", count);
});n